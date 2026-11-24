import { SITE, whatsappLink } from '@/lib/site';
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from './icons';
import { cn } from './cn';

type Network = 'instagram' | 'youtube' | 'whatsapp';

const NETWORKS: Record<Network, { label: string; href: string; Icon: typeof InstagramIcon }> = {
  instagram: {
    label: `Instagram ${SITE.social.instagramHandle}`,
    href: SITE.social.instagram,
    Icon: InstagramIcon,
  },
  youtube: { label: 'YouTube @aluteconta', href: SITE.social.youtube, Icon: YouTubeIcon },
  whatsapp: {
    label: 'WhatsApp',
    href: whatsappLink('Olá, Lú! Vim pelo site.'),
    Icon: WhatsAppIcon,
  },
};

type Props = {
  networks?: Network[];
  /** claro: para fundos claros (azul → laranja no hover); escuro: para fundos escuros */
  variant?: 'claro' | 'escuro';
  size?: 'md' | 'lg';
  className?: string;
};

/** Botões redondos com o ícone de cada rede (nome acessível via aria-label) */
export function SocialLinks({
  networks = ['instagram', 'youtube'],
  variant = 'claro',
  size = 'md',
  className,
}: Props) {
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {networks.map((key) => {
        const { label, href, Icon } = NETWORKS[key];
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${label}, abre em nova aba`}
              title={label}
              className={cn(
                'inline-flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5',
                size === 'lg' ? 'size-14' : 'size-11',
                variant === 'claro'
                  ? 'bg-azul text-branco hover:bg-laranja hover:text-noite shadow-md'
                  : 'bg-branco/10 text-branco ring-branco/25 hover:bg-laranja hover:text-noite ring-1',
              )}
            >
              <Icon className={size === 'lg' ? 'size-7' : 'size-5'} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
