import type { ReactNode } from 'react';
import type { ResponsiveImage } from '@/lib/images';
import { Img } from '../ui/Img';
import { cn } from '../ui/cn';

type Props = {
  href: string;
  title: string;
  image: ResponsiveImage;
  /** Selo acima do título (categoria, tipo de evento) */
  kicker?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  aspect?: 'video' | 'square' | 'portrait';
  headingLevel?: 'h2' | 'h3';
};

const ASPECTS = { video: 'aspect-[16/10]', square: 'aspect-square', portrait: 'aspect-[4/5]' };

/**
 * Card base: o card inteiro é clicável pelo link do título (padrão acessível:
 * um único link por card, o resto do card expande a área de clique via CSS).
 */
export function Card({
  href,
  title,
  image,
  kicker,
  children,
  footer,
  aspect = 'video',
  headingLevel = 'h3',
}: Props) {
  const Heading = headingLevel;
  return (
    <article className="group border-borda bg-branco relative flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow focus-within:shadow-lg hover:shadow-lg">
      <div className={cn('bg-creme overflow-hidden', ASPECTS[aspect])}>
        <Img image={image} className="transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {kicker && <div className="flex flex-wrap gap-2">{kicker}</div>}
        <Heading className="text-noite text-lg leading-snug">
          <a
            href={href}
            className="after:absolute after:inset-0 hover:underline focus:outline-none"
          >
            {title}
          </a>
        </Heading>
        {children}
        {footer && <div className="text-cinza mt-auto pt-2 text-sm">{footer}</div>}
      </div>
    </article>
  );
}

export function CardGrid({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };
  return <ul className={cn('grid gap-6', cols[columns])}>{children}</ul>;
}
