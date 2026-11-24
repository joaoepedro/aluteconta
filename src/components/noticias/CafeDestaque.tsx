import { ButtonLink } from '../ui/Button';
import { CoffeeCup } from '../ui/CoffeeCup';
import { CalendarIcon, MapPinIcon } from '../ui/icons';

type Props = {
  /** Próxima edição; sem ela, mostra a chamada geral do projeto */
  next?:
    | {
        theme: string;
        dateLabel: string;
        isoDate: string;
        location: string;
        href: string;
      }
    | undefined;
};

/** Destaque do Café Conexão na página inicial (logo abaixo da manchete) */
export function CafeDestaque({ next }: Props) {
  return (
    <section
      aria-labelledby="destaque-cafe"
      className="bg-creme border-laranja/50 flex flex-col gap-4 rounded-2xl border-2 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
        <CoffeeCup className="w-16 shrink-0 sm:w-24" />
        <div className="min-w-0">
          <p className="text-laranja-texto text-xs font-bold tracking-wide uppercase sm:text-sm">
            Café Conexão{next ? ' · Próxima edição' : ''}
          </p>
          <h2 id="destaque-cafe" className="text-noite mt-1 text-xl leading-tight sm:text-2xl">
            {next ? next.theme : 'Rodas de conversa sobre comportamento, saúde e qualidade de vida'}
          </h2>
          {next ? (
            <div className="text-noite mt-2 flex flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:gap-x-5 sm:text-base">
              <span className="flex items-center gap-2">
                <CalendarIcon className="text-azul size-4 shrink-0 sm:size-5" />
                <time dateTime={next.isoDate}>{next.dateLabel}</time>
              </span>
              <span className="flex items-center gap-2">
                <MapPinIcon className="text-azul size-4 shrink-0 sm:size-5" />
                {next.location}
              </span>
            </div>
          ) : (
            <p className="text-noite/80 mt-2">Novas edições em breve. Conheça o projeto.</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:shrink-0 sm:flex-col sm:flex-nowrap sm:items-stretch sm:gap-3">
        {next && (
          <ButtonLink
            href={next.href}
            variant="accent"
            className="flex-1 whitespace-nowrap sm:flex-none"
          >
            Quero participar
          </ButtonLink>
        )}
        {next ? (
          <a
            href="/cafe-conexao"
            className="text-azul text-center text-sm font-semibold whitespace-nowrap underline"
          >
            Conhecer o projeto
          </a>
        ) : (
          <ButtonLink href="/cafe-conexao" variant="accent" className="whitespace-nowrap">
            Conhecer o projeto
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
