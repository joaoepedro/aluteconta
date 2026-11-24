import { MAIN_NAV } from '@/lib/navigation';
import { SITE, whatsappLink } from '@/lib/site';
import { Container } from '../ui/Container';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-noite text-branco">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="/" className="inline-block" aria-label={`${SITE.name}, página inicial`}>
            <img
              src="/images/logo-96.webp"
              srcSet="/images/logo-96.webp 1x, /images/logo-192.webp 2x"
              alt=""
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="size-24"
            />
          </a>
          <p className="text-branco/80 mt-5 max-w-md">{SITE.description}</p>
          <SocialLinks
            networks={['instagram', 'youtube', 'whatsapp']}
            variant="escuro"
            className="mt-6"
          />
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-branco mb-3 text-base">Navegue</h2>
          <ul className="space-y-2">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-branco/90 hover:text-laranja">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-branco mb-3 text-base">Fale com a Lú</h2>
          <ul className="space-y-2">
            <li>
              <a
                href={whatsappLink('Olá, Lú! Vim pelo site.')}
                className="text-branco/90 hover:text-laranja"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-branco/90 hover:text-laranja break-all"
              >
                {SITE.contact.email}
              </a>
            </li>
          </ul>
          <p className="text-branco/70 mt-4 text-sm">
            {SITE.address.city} – {SITE.address.region} e região
          </p>
        </div>
      </Container>
      <div className="border-branco/15 border-t">
        <Container className="text-branco/70 flex flex-col gap-2 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} · {SITE.person.name}
          </p>
          <p>
            Desenvolvido por{' '}
            <a
              href="https://odevjp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-branco hover:text-laranja font-semibold underline underline-offset-4"
            >
              jotap.
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
