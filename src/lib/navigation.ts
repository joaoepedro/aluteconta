export type NavItem = {
  label: string;
  href: string;
  /** Item com destaque visual (cor da marca) */
  highlight?: boolean;
};

/**
 * Barra de seções (abaixo do logo, estilo portal de notícias).
 * No celular ela desliza para o lado; a ordem aqui é a ordem na tela.
 */
export const MAIN_NAV: NavItem[] = [
  { label: 'Café Conexão', href: '/cafe-conexao', highlight: true },
  { label: 'Entrevistas', href: '/entrevistas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Agenda', href: '/eventos/agenda' },
  { label: 'Para Marcas', href: '/para-marcas' },
  { label: 'Sobre a Lú', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

/** Botão do canto direito do cabeçalho */
export const HEADER_CTA: NavItem = { label: 'Orçamento', href: '/para-marcas#orcamento' };

/**
 * Item ativo: o mais específico vence (em /eventos/agenda acende "Agenda",
 * não "Eventos").
 */
export function activeHref(currentPath: string, items: NavItem[] = MAIN_NAV): string | undefined {
  return items
    .filter((i) => currentPath === i.href || currentPath.startsWith(`${i.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

export function isActive(currentPath: string, href: string): boolean {
  if (href === '/') return currentPath === '/';
  return activeHref(currentPath) === href;
}
