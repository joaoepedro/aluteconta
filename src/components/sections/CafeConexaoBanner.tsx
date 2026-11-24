import { ButtonLink } from '../ui/Button';
import { CoffeeCup } from '../ui/CoffeeCup';
import { Container } from '../ui/Container';
import { CalendarIcon, ChatIcon, HeartIcon, LeafIcon, MapPinIcon } from '../ui/icons';

type Props = {
  /** Próxima edição; sem ela, mostra a chamada geral do projeto */
  next?:
    | {
        title: string;
        theme: string;
        dateLabel: string;
        isoDate: string;
        location: string;
        href: string;
      }
    | undefined;
};

const THEMES = [
  { label: 'Comportamento', icon: ChatIcon },
  { label: 'Saúde e bem-estar', icon: HeartIcon },
  { label: 'Qualidade de vida', icon: LeafIcon },
];

export function CafeConexaoBanner({ next }: Props) {
  return (
    <section
      aria-labelledby="cafe-conexao-banner"
      className="bg-creme relative overflow-hidden py-14"
    >
      <div
        aria-hidden="true"
        className="bg-laranja/10 absolute -bottom-24 -left-24 size-72 rounded-full"
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[auto_1.3fr_1fr]">
        <CoffeeCup className="mx-auto w-32 sm:w-40" />

        <div>
          <p className="text-laranja-texto text-sm font-semibold tracking-wide uppercase">
            Projeto Café Conexão
          </p>
          <h2 id="cafe-conexao-banner" className="mt-2 text-3xl sm:text-4xl">
            Rodas de conversa sobre comportamento, saúde, bem-estar e qualidade de vida
          </h2>
          <p className="text-noite/80 mt-4 text-lg">
            Um encontro que reúne a comunidade, empreendedores e profissionais liberais com
            convidados especialistas, oficinas práticas e muita conexão.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {THEMES.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="bg-branco text-noite inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-3 text-sm font-semibold shadow-sm"
              >
                <Icon className="text-laranja-texto size-4" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-branco border-laranja rounded-2xl border-2 p-6 shadow-lg">
          {next ? (
            <>
              <p className="text-laranja-texto text-sm font-semibold uppercase">Próxima edição</p>
              <p className="font-display text-azul mt-1 text-2xl font-bold">{next.theme}</p>
              <p className="text-noite mt-3 flex items-center gap-2">
                <CalendarIcon className="text-azul size-5" />
                <time dateTime={next.isoDate}>{next.dateLabel}</time>
              </p>
              <p className="text-noite mt-1 flex items-center gap-2">
                <MapPinIcon className="text-azul size-5" />
                {next.location}
              </p>
              <ButtonLink href={next.href} variant="accent" className="mt-5 w-full">
                Quero participar
              </ButtonLink>
            </>
          ) : (
            <>
              <p className="font-display text-azul text-xl font-bold">Novas edições em breve</p>
              <p className="text-noite mt-2">
                Conheça o projeto e veja como foram os encontros anteriores.
              </p>
              <ButtonLink href="/cafe-conexao" variant="accent" className="mt-5 w-full">
                Conhecer o Café Conexão
              </ButtonLink>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
