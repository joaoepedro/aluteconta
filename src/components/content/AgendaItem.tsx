import type { AgendaItemData } from './types';

export function AgendaItem({ item }: { item: AgendaItemData }) {
  return (
    <article className="border-borda bg-branco flex gap-4 rounded-2xl border p-5 sm:gap-6">
      <time
        dateTime={item.isoDate}
        className="bg-azul text-branco flex size-16 shrink-0 flex-col items-center justify-center rounded-xl sm:size-20"
      >
        <span className="font-display text-2xl leading-none font-bold sm:text-3xl">{item.day}</span>
        <span className="text-xs font-semibold uppercase">{item.month}</span>
      </time>
      <div className="min-w-0 flex-1">
        <h3 className="text-noite text-lg">{item.title}</h3>
        <p className="text-cinza mt-1 text-sm">
          {item.timeLabel && <>{item.timeLabel} · </>}
          {item.location}
        </p>
        <p className="text-noite/80 mt-2">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          {item.url && (
            <a
              href={item.url}
              className="text-azul underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inscrições e informações<span className="sr-only">, abre em nova aba</span>
            </a>
          )}
          <a
            href={item.googleCalendarUrl}
            className="text-azul underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adicionar ao Google Agenda<span className="sr-only">, abre em nova aba</span>
          </a>
          <a href={item.icsHref} className="text-azul underline" download>
            Baixar para outra agenda (.ics)
          </a>
        </div>
      </div>
    </article>
  );
}
