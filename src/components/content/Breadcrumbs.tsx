import type { Crumb } from '@/lib/seo';
import { cn } from '../ui/cn';

/** Trilha de navegação. O último item é a página atual. */
export function Breadcrumbs({
  items,
  center = 'none',
}: {
  items: Crumb[];
  /** Centraliza no celular/tablet (topo de página com título centralizado) */
  center?: 'none' | 'md' | 'lg';
}) {
  return (
    <nav aria-label="Você está em" className="text-cinza mb-6 text-sm">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-2 gap-y-1',
          center === 'lg' && 'max-lg:justify-center',
          center === 'md' && 'max-md:justify-center',
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-noite line-clamp-1">
                  {item.label}
                </span>
              ) : (
                <>
                  <a href={item.href} className="hover:text-azul">
                    {item.label}
                  </a>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
