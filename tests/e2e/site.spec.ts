import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  '/',
  '/entrevistas',
  '/entrevistas/exemplo-empreendedora',
  '/eventos',
  '/eventos/exemplo-confraternizacao',
  '/eventos/agenda',
  '/cafe-conexao',
  '/cafe-conexao/exemplo-outubro-rosa',
  '/para-marcas',
  '/para-marcas/marcas/exemplo-marca',
  '/sobre',
  '/contato',
];

for (const path of PAGES) {
  test.describe(path, () => {
    test('sem violações de acessibilidade (WCAG 2.2 AA)', async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}x ${v.help}`)).toEqual([]);
    });

    test('SEO básico: um H1, título, descrição, canonical e JSON-LD', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/A Lú Te Conta!/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        /^https:\/\/aluteconta\.com\.br/,
      );
      const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(jsonLd.length).toBeGreaterThan(0);
      for (const block of jsonLd) expect(() => JSON.parse(block)).not.toThrow();
    });

    test('todas as imagens têm texto alternativo e tamanho definido', async ({ page }) => {
      await page.goto(path);
      const bad = await page
        .locator('img')
        .evaluateAll((imgs) =>
          imgs
            .filter(
              (img) =>
                !img.hasAttribute('alt') ||
                !img.getAttribute('width') ||
                !img.getAttribute('height'),
            )
            .map((img) => img.getAttribute('src')),
        );
      expect(bad).toEqual([]);
    });
  });
}

test('link "pular para o conteúdo" leva ao conteúdo principal', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('menu do celular abre, fecha com Esc e devolve o foco', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'só no celular');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Abrir menu' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(
    page.locator('#menu-mobile').getByRole('link', { name: 'Café Conexão' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#menu-mobile')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
});

test('agenda oferece Google Agenda e arquivo .ics válido', async ({ page, request }) => {
  await page.goto('/eventos/agenda');
  await expect(page.getByRole('link', { name: /Google Agenda/ }).first()).toHaveAttribute(
    'href',
    /calendar\.google\.com/,
  );
  const ics = await page.getByRole('link', { name: /\.ics/ }).first().getAttribute('href');
  const res = await request.get(ics!);
  expect(res.ok()).toBe(true);
  expect(await res.text()).toContain('BEGIN:VEVENT');
});

test('página inexistente mostra 404 amigável', async ({ page }) => {
  const res = await page.goto('/nao-existe');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ainda não contou');
});

test('filtros não mostram barra de rolagem', async ({ page }) => {
  await page.goto('/eventos');
  const list = page.getByRole('navigation', { name: 'Filtrar eventos por tipo' }).locator('ul');
  if ((page.viewportSize()?.width ?? 1000) < 640) {
    // celular: desliza de lado, mas sem barra visível
    await expect(list).toHaveCSS('scrollbar-width', 'none');
  } else {
    // desktop: quebra linha, nada transborda
    const overflow = await list.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('menu do celular abre ocupando a tela', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'só no celular');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const box = await page.locator('#menu-mobile').boundingBox();
  const viewport = page.viewportSize();
  expect(box!.height).toBeGreaterThan(viewport!.height * 0.7);
  for (const name of [
    'Entrevistas',
    'Eventos',
    'Para Marcas',
    'Sobre a Lú',
    'Contato',
    'Café Conexão',
  ]) {
    await expect(
      page.locator('#menu-mobile').getByRole('link', { name, exact: true }),
    ).toBeInViewport();
  }
});

test('rodapé tem crédito "Desenvolvido por jotap."', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer').getByRole('link', { name: 'jotap.' })).toHaveAttribute(
    'href',
    'https://odevjp.vercel.app/',
  );
});

test('não há faixa de campanha Black Week', async ({ page }) => {
  for (const path of ['/', '/para-marcas']) {
    await page.goto(path);
    await expect(page.getByText(/Black Week/i)).toHaveCount(0);
  }
});

test('troca de filtro sem recarregar a página', async ({ page }) => {
  await page.goto('/eventos');
  await page.evaluate(() => ((window as unknown as { marcador: number }).marcador = 42));
  const nav = page.getByRole('navigation', { name: 'Filtrar eventos por tipo' });
  const barra = nav.locator('ul');

  const alvo = nav.getByRole('link', { name: 'Festa e confraternização' });
  await alvo.click();

  await expect(page).toHaveURL(/\/eventos\/tipo\/confraternizacao$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Eventos: Festa e confraternização',
  );
  await expect(alvo).toHaveAttribute('aria-current', 'page');
  expect(await page.evaluate(() => (window as unknown as { marcador?: number }).marcador)).toBe(42);

  if ((page.viewportSize()?.width ?? 1000) < 640) {
    // celular: a barra não volta para o início depois da troca
    expect(await barra.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  }

  // filtro sem itens mostra a mensagem
  await nav.getByRole('link', { name: 'Premiação' }).click();
  await expect(page.getByText('Ainda não há coberturas deste tipo.')).toBeVisible();

  // voltar do navegador restaura o filtro anterior
  await page.goBack();
  await expect(page).toHaveURL(/\/eventos\/tipo\/confraternizacao$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Eventos: Festa e confraternização',
  );
});

test('páginas de filtro funcionam abertas direto (sem JavaScript de filtro)', async ({ page }) => {
  await page.goto('/entrevistas/categoria/artistas-e-cultura');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Entrevistas: Artistas e cultura',
  );
  await expect(page.getByText('Ainda não há entrevistas nesta categoria.')).toBeVisible();
  await page.goto('/entrevistas/categoria/empreendedores-e-empresas');
  await expect(page.getByRole('link', { name: 'Nome da Entrevistada' })).toBeVisible();
});

test('cabeçalho não quebra em nenhuma largura', async ({ page }) => {
  await page.goto('/eventos');
  const header = page.locator('header');
  const box = await header.boundingBox();
  expect(box!.height).toBeLessThanOrEqual(66);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('Instagram aponta para @colunistalucienemoraes', async ({ page }) => {
  await page.goto('/sobre');
  await expect(
    page.getByRole('link', { name: /Instagram @colunistalucienemoraes/ }).first(),
  ).toHaveAttribute('href', 'https://www.instagram.com/colunistalucienemoraes');
});
