import type { ResponsiveImage } from '@/lib/images';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { IconBadge } from '../ui/IconBadge';
import { Img } from '../ui/Img';
import { CameraIcon, ChatIcon, MicIcon, SparkleIcon } from '../ui/icons';

type Props = {
  title: string;
  subtitle: string;
  portrait?: ResponsiveImage | undefined;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export function Hero({ title, subtitle, portrait, primary, secondary }: Props) {
  return (
    <section className="bg-azul text-branco relative overflow-hidden">
      {/* fundo: brilho e pontilhado */}
      <div
        aria-hidden="true"
        className="bg-brilho/40 absolute -top-32 -right-32 size-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:22px_22px] opacity-[0.07]"
      />
      {/* ícones flutuando (celular e tablet) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden">
        <IconBadge
          icon={MicIcon}
          tone="claro"
          size="md"
          animated
          className="absolute top-8 right-5"
        />
        <IconBadge
          icon={ChatIcon}
          tone="claro"
          size="sm"
          className="animate-flutuar-lento absolute top-28 right-16 [animation-delay:1s]"
        />
        <SparkleIcon className="text-laranja animate-brilhar absolute top-6 right-24 size-5" />
      </div>

      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="bg-laranja text-noite inline-block rounded-md px-3 py-1 text-sm font-bold tracking-wide uppercase">
            Comunicação e Conteúdo
          </p>
          <h1 className="text-branco mt-5 text-4xl leading-tight sm:text-6xl">{title}</h1>
          <p className="text-branco/90 mt-5 max-w-xl text-lg sm:text-xl">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="accent" size="lg">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="light" size="lg">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>

        {portrait && (
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div
              aria-hidden="true"
              className="border-laranja/70 absolute -inset-4 rounded-[2.5rem] border-2 border-dashed"
            />
            <div className="border-branco/20 relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4">
              <Img image={portrait} priority className="object-top" />
            </div>
            <IconBadge
              icon={MicIcon}
              tone="laranja"
              size="lg"
              animated
              className="absolute top-10 -left-8 shadow-xl"
            />
            <IconBadge
              icon={CameraIcon}
              tone="creme"
              size="md"
              className="animate-flutuar-lento absolute -right-6 bottom-16 shadow-xl [animation-delay:1.5s]"
            />
            <SparkleIcon
              aria-hidden="true"
              className="text-laranja animate-brilhar absolute -top-8 right-6 size-8"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
