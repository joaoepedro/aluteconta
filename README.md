# A Lú Te Conta! — site

Site da **A Lú Te Conta! · Comunicação e Conteúdo** (Luciene Moraes, Franca – SP):
entrevistas, cobertura de eventos, o projeto **Café Conexão**, vitrine de marcas e agenda.

- **Astro 7** gera o site como HTML estático; componentes em **React** (`.tsx`).
- **Conteúdo em Markdown** dentro do repositório, com campos validados.
- **Cloudflare** (plano gratuito): arquivos estáticos + uma função para os formulários.
- **Tailwind CSS 4** com os tokens da paleta da marca.

JavaScript no navegador só onde há interação: formulários e vídeo do YouTube (React, carregados
quando aparecem na tela) e o menu do celular (script de ~1 KB). Páginas de conteúdo não carregam React.

## Requisitos

- Node 22.23+ (`.nvmrc`)
- Conta Cloudflare (deploy) e, para os formulários, Resend + Turnstile (abaixo)

## Comandos

| Comando                           | O que faz                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `npm install`                     | Instala as dependências                                                                  |
| `npm run dev`                     | Servidor local em http://localhost:4321                                                  |
| `npm run build`                   | Gera tipos, checa TypeScript e gera o site em `dist/`                                    |
| `npm run preview`                 | Testa a build localmente (inclui a função dos formulários)                               |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                                        |
| `npm test`                        | Testes unitários (Vitest)                                                                |
| `npm run test:e2e`                | Testes de ponta a ponta + acessibilidade (Playwright + axe) — rode `npm run build` antes |
| `npm run deploy`                  | Build + publicação na Cloudflare                                                         |

## Publicar conteúdo novo

1. Copie um modelo de `src/content/_modelos/` para a pasta do tipo:

   | Tipo                   | Pasta                       | Endereço gerado                 |
   | ---------------------- | --------------------------- | ------------------------------- |
   | Entrevista             | `src/content/entrevistas/`  | `/entrevistas/<arquivo>`        |
   | Cobertura de evento    | `src/content/coberturas/`   | `/eventos/<arquivo>`            |
   | Edição do Café Conexão | `src/content/cafe-conexao/` | `/cafe-conexao/<arquivo>`       |
   | Marca em destaque      | `src/content/marcas/`       | `/para-marcas/marcas/<arquivo>` |
   | Evento da agenda       | `src/content/agenda/`       | lista em `/eventos/agenda`      |

2. Nome do arquivo = endereço da página: minúsculas, sem acento, com hífens
   (`maria-silva-doceria.md`). Fotos numa pasta com o mesmo nome (`maria-silva-doceria/capa.jpg`).
3. Preencha os campos. O que é obrigatório está em `src/content.config.ts`; se faltar algo,
   `npm run build` para e diz o arquivo e o campo.
4. `git push` na `main` → o GitHub Actions publica.

Detalhes e regras: [`src/content/_modelos/LEIA-ME.md`](src/content/_modelos/LEIA-ME.md).

**Apague os arquivos `exemplo-*`** (e as pastas de fotos deles) quando entrar o conteúdo real.
Não crie conteúdo de evento com os nomes `agenda` ou `tipo`, que já são endereços do site.

### O que muda sem mexer em componente

| Quero mudar…                                           | Arquivo                            |
| ------------------------------------------------------ | ---------------------------------- |
| Telefone, e-mail, redes, cidade, descrição do site     | `src/lib/site.ts`                  |
| Itens do menu                                          | `src/lib/navigation.ts`            |
| Categorias de entrevista, tipos de evento              | `src/lib/taxonomy.ts`              |
| Pacotes, preços, adicionais, campanha sazonal (banner) | `src/data/servicos.ts`             |
| Mostrar ou esconder preços                             | `showPrices` em `src/lib/site.ts`  |
| Cores e fontes                                         | `src/styles/global.css` (`@theme`) |
| Redirecionamentos de endereços antigos                 | `redirects` em `astro.config.mjs`  |

## Estrutura

```
src/
  content/            conteúdo em Markdown (+ _modelos/ para copiar)
  content.config.ts   campos de cada tipo de conteúdo
  components/
    ui/               Button, Container, Badge, SectionHeading, Img
    layout/           Header, MobileMenu, Footer, SkipLink
    sections/         Hero, CafeConexaoBanner, AboutTeaser, ServicesTeaser
    content/          cards, Gallery, YouTubeLite, AgendaItem, PeopleList, PricingTable, FilterNav
    forms/            QuoteForm, CafeConexaoForm (+ campos e envio)
    seo/              Seo (meta tags), JsonLd
  layouts/            BaseLayout, ArticleLayout, ListingLayout (foto de fundo opcional)
  components/listagens/ EntrevistasListagem, EventosListagem (filtros sem recarregar)
  pages/              rotas; pages/api/contato.ts = função dos formulários na Cloudflare
  lib/                site, navegação, datas, consultas, cards, imagens, SEO, agenda, formulários
  data/               serviços e preços
tests/unit/           Vitest
tests/e2e/            Playwright + axe
```

Regras: componentes de `ui/` não sabem de conteúdo; `content/` recebe dados prontos por props
(tipos em `components/content/types.ts`); só `pages/` e `lib/` leem as coleções.
`lib/cards.ts` é a ponte entre conteúdo e componentes.

## Formulários (orçamento e Café Conexão)

O envio vai para `/api/contato`, função que roda na Cloudflare. Ela valida os dados, confere o
anti-spam e manda o e-mail pela API do Resend. Sem as chaves (ambiente local), o conteúdo só aparece
no terminal.

1. **Turnstile** (anti-spam gratuito da Cloudflare): crie um widget para `aluteconta.com.br`.
   - Chave pública → `PUBLIC_TURNSTILE_SITE_KEY` (`.env` local, variável do GitHub para o deploy)
   - Chave secreta → `npx wrangler secret put TURNSTILE_SECRET_KEY`
2. **Resend**: verifique o domínio `aluteconta.com.br` e crie uma API key →
   `npx wrangler secret put RESEND_API_KEY`
3. E-mails de destino e remetente: `vars` em `wrangler.jsonc`.

Para testar localmente: copie `.dev.vars.example` para `.dev.vars` e `.env.example` para `.env`.

## Deploy na Cloudflare

Primeira vez:

```bash
npx wrangler login
npm run deploy
```

Depois, em Workers & Pages → `aluteconta` → _Domains & Routes_, adicione `aluteconta.com.br`
e `www.aluteconta.com.br` (o domínio precisa estar na Cloudflare).

Deploy automático (`.github/workflows/deploy.yml`): a cada push na `main` e **todo dia às 06:00**.
O build diário tira da agenda os eventos que já passaram e esconde campanhas vencidas.
Cadastre no GitHub (Settings → Secrets and variables → Actions):

- Secrets: `CLOUDFLARE_API_TOKEN` (permissão _Workers Scripts: Edit_), `CLOUDFLARE_ACCOUNT_ID`
- Variables: `PUBLIC_TURNSTILE_SITE_KEY`

O CI (`ci.yml`) roda lint, formatação, testes unitários, build, testes de ponta a ponta com axe
e Lighthouse (performance ≥ 90, acessibilidade ≥ 95, SEO ≥ 95).

## Depois de publicar

- Google Search Console: verificar o domínio e enviar `https://aluteconta.com.br/sitemap-index.xml`
- Perfil da empresa no Google com nome, telefone e cidade iguais aos de `src/lib/site.ts`
- Cloudflare Web Analytics (sem cookies) no painel da Cloudflare
- Mapear URLs antigas do WordPress que tenham acessos e adicionar em `redirects`

## Pendências de conteúdo

- [ ] Confirmar e-mail de contato (`src/lib/site.ts`)
- [ ] Fotos reais da Lú (`src/assets/lu-retrato.jpg`) e revisão do texto/trajetória em `src/pages/sobre.astro`
- [ ] Substituir os conteúdos `exemplo-*` pelos reais (entrevistas e coberturas do site antigo)
- [ ] Decidir se os preços ficam visíveis (`showPrices`)
- [ ] Dados reais do Café Conexão (próxima edição, local, inscrição)
- [ ] Logo em SVG (hoje PNG em `src/assets/`)
