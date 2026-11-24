import { INCLUDED, PACKAGES } from '@/data/servicos';
import { PACKAGE_ICONS } from '../content/packageIcons';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { IconBadge } from '../ui/IconBadge';
import { CheckIcon, MegaphoneIcon, SparkleIcon } from '../ui/icons';

export function ServicesTeaser() {
  return (
    <section
      aria-labelledby="para-marcas-home"
      className="bg-azul text-branco relative overflow-hidden py-16"
    >
      <MegaphoneIcon
        aria-hidden="true"
        className="text-branco/5 absolute -top-6 -right-10 size-72 -rotate-12 stroke-[1.25]"
      />
      <Container className="relative">
        <div className="flex items-center gap-3">
          <IconBadge icon={MegaphoneIcon} tone="claro" size="sm" />
          <p className="text-creme text-sm font-semibold tracking-wide uppercase">
            Para marcas e eventos
          </p>
        </div>
        <h2 id="para-marcas-home" className="text-branco mt-3 text-3xl sm:text-4xl">
          Seu evento contado do jeito da Lú
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {PACKAGES.map((pkg) => {
            const Icon = PACKAGE_ICONS[pkg.id];
            return (
              <li
                key={pkg.id}
                className="bg-branco/10 hover:bg-branco/15 ring-branco/10 rounded-2xl p-5 ring-1 transition-colors"
              >
                <span className="bg-laranja text-noite inline-flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-6" />
                </span>
                <p className="font-display text-branco mt-4 text-lg font-bold">{pkg.name}</p>
                <p className="text-branco/85 mt-1">{pkg.purpose}</p>
              </li>
            );
          })}
        </ul>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((item) => (
            <li key={item} className="text-branco/90 flex items-start gap-2">
              <CheckIcon className="text-laranja mt-0.5 size-5" />
              {item}
            </li>
          ))}
        </ul>
        <ButtonLink href="/para-marcas" variant="accent" size="lg" className="mt-10">
          <SparkleIcon className="size-5" />
          Ver pacotes e pedir orçamento
        </ButtonLink>
      </Container>
    </section>
  );
}
