export type NavItem = {
  label: string;
  href: string;
  /** Item com destaque visual no menu (botão) */
  highlight?: boolean;
};

export const MAIN_NAV: NavItem[] = [
  { label: 'Entrevistas', href: '/entrevistas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Para Marcas', href: '/para-marcas' },
  { label: 'Sobre a Lú', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
  { label: 'Café Conexão', href: '/cafe-conexao', highlight: true },
];

export function isActive(currentPath: string, href: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
