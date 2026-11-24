import type { ResponsiveImage } from '@/lib/images';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { IconBadge } from '../ui/IconBadge';
import { Img } from '../ui/Img';
import { HeartIcon, MicIcon, SparkleIcon } from '../ui/icons';

export function AboutTeaser({ photo }: { photo?: ResponsiveImage | undefined }) {
  return (
    <section aria-labelledby="quem-e-a-lu" className="py-16">
      <Container className="grid items-center gap-12 md:grid-cols-[1fr_1.4fr]">
        {photo && (
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="bg-laranja absolute -right-3 -bottom-3 size-full rounded-[2rem]"
            />
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Img image={photo} className="object-top" />
            </div>
            <IconBadge
              icon={HeartIcon}
              tone="creme"
              size="md"
              animated
              className="absolute -top-4 -left-4 shadow-lg"
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <IconBadge icon={MicIcon} size="sm" />
            <p className="text-laranja-texto text-sm font-semibold tracking-wide uppercase">
              Quem conta
            </p>
          </div>
          <h2 id="quem-e-a-lu" className="mt-3 text-3xl sm:text-4xl">
            Luciene Moraes, a Lú
            <SparkleIcon
              aria-hidden="true"
              className="text-laranja animate-brilhar ml-2 inline size-7 align-top"
            />
          </h2>
          <p className="text-noite/80 mt-4 text-lg">
            Comunicadora, colunista social digital e apresentadora. Formada em Educação Física,
            construiu sua trajetória em projetos de inclusão social, esporte e dança, e hoje usa a
            comunicação para conectar pessoas, marcas e comunidade, com foco em saúde, bem-estar e
            empreendedorismo.
          </p>
          <ButtonLink href="/sobre" variant="outline" className="mt-6">
            Conheça a trajetória da Lú
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
