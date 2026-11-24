import { Img } from '../ui/Img';
import type { NewsItemData } from '../content/types';

/** Linha de notícia: miniatura à esquerda, categoria e título à direita */
export function NewsRow({
  item,
  headingLevel = 'h3',
}: {
  item: NewsItemData;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex gap-4 py-4">
      <div className="bg-creme aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36">
        <Img image={item.image} className="object-[50%_30%]" />
      </div>
      <div className="min-w-0">
        <p className="text-laranja-texto text-sm font-semibold">
          {item.kind} · {item.kicker}
        </p>
        <Heading className="text-noite mt-1 text-lg leading-snug">
          <a
            href={item.href}
            className="group-hover:underline after:absolute after:inset-0 focus:outline-none"
          >
            {item.title}
          </a>
        </Heading>
        <p className="text-cinza mt-1 text-sm">
          <time dateTime={item.isoDate}>{item.dateLabel}</time>
        </p>
      </div>
    </article>
  );
}

export function NewsList({ items }: { items: NewsItemData[] }) {
  return (
    <ul className="divide-borda divide-y">
      {items.map((item) => (
        <li key={item.id}>
          <NewsRow item={item} />
        </li>
      ))}
    </ul>
  );
}
