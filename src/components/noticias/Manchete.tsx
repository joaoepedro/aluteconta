import { Img } from '../ui/Img';
import type { NewsItemData } from '../content/types';

/**
 * Manchete da página inicial: foto grande, selo do tipo, título grande e resumo.
 * O card inteiro é clicável pelo link do título.
 */
export function Manchete({ item }: { item: NewsItemData }) {
  return (
    <article className="group relative">
      <div className="bg-creme aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[16/9]">
        <Img
          image={item.image}
          priority
          className="object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="bg-azul text-branco font-display px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
          {item.kind}
        </span>
        <span className="text-laranja-texto text-sm font-semibold">{item.kicker}</span>
      </div>
      <h2 className="text-noite mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.6rem]">
        <a
          href={item.href}
          className="group-hover:underline after:absolute after:inset-0 focus:outline-none"
        >
          {item.title}
        </a>
      </h2>
      <p className="text-noite/80 mt-3 text-lg">{item.description}</p>
      <p className="text-cinza mt-3 text-sm">
        <time dateTime={item.isoDate}>{item.dateLabel}</time>
      </p>
    </article>
  );
}
