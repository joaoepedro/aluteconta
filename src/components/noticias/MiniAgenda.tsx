import type { AgendaItemData } from '../content/types';

/** Próximos eventos em lista compacta (página inicial) */
export function MiniAgenda({ items }: { items: AgendaItemData[] }) {
  return (
    <ul className="divide-borda divide-y">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-4 py-3">
          <time
            dateTime={item.isoDate}
            className="bg-azul text-branco flex size-14 shrink-0 flex-col items-center justify-center rounded-xl"
          >
            <span className="font-display text-xl leading-none font-bold">{item.day}</span>
            <span className="text-xs font-semibold uppercase">{item.month}</span>
          </time>
          <div className="min-w-0">
            <h3 className="text-noite text-base leading-snug">{item.title}</h3>
            <p className="text-cinza text-sm">
              {item.timeLabel && <>{item.timeLabel} · </>}
              {item.location}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
