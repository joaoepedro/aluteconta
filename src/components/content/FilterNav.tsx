import { cn } from '../ui/cn';

export type FilterItem = {
  label: string;
  /** Página estática do filtro (funciona sem JavaScript e é indexada pelo Google) */
  href: string;
  /** Valor comparado com data-filtro dos itens; '' = todos */
  value: string;
  /** H1 mostrado ao escolher este filtro */
  heading: string;
  /** Título da aba ao escolher este filtro */
  docTitle: string;
};

type Props = {
  label: string;
  items: FilterItem[];
  current: string;
};

/**
 * Filtros como links para páginas estáticas. Com JavaScript (FilterScript.astro),
 * a troca acontece na própria página, sem recarregar: a barra não volta ao início
 * e o endereço é atualizado (voltar/avançar do navegador funcionam).
 * Celular: uma linha que desliza com o dedo, sem barra de rolagem visível.
 * Tablet/desktop: os filtros quebram linha.
 */
export function FilterNav({ label, items, current }: Props) {
  return (
    <nav aria-label={label} data-filtro-nav className="relative -mx-4 mb-8 sm:mx-0">
      <ul
        data-fade-scroll
        className="no-scrollbar fade-end flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:overflow-visible sm:[mask-image:none] sm:px-0"
      >
        {items.map((item) => (
          <li key={item.href} className="shrink-0 snap-start">
            <a
              href={item.href}
              aria-current={item.href === current ? 'page' : undefined}
              data-filtro-valor={item.value}
              data-filtro-titulo={item.heading}
              data-filtro-doc-titulo={item.docTitle}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-semibold whitespace-nowrap no-underline transition-colors duration-200',
                'border-borda bg-branco text-azul hover:border-azul',
                'aria-[current=page]:border-azul aria-[current=page]:bg-azul aria-[current=page]:text-branco',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
