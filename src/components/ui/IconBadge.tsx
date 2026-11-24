import type { ComponentType } from 'react';
import { cn } from './cn';

type Tone = 'azul' | 'laranja' | 'creme' | 'claro';
type Size = 'sm' | 'md' | 'lg';

const TONES: Record<Tone, string> = {
  azul: 'bg-azul/10 text-azul',
  laranja: 'bg-laranja text-noite',
  creme: 'bg-creme text-azul',
  claro: 'bg-branco/15 text-branco ring-1 ring-branco/25',
};

const SIZES: Record<Size, { box: string; icon: string }> = {
  sm: { box: 'size-9 rounded-xl', icon: 'size-5' },
  md: { box: 'size-12 rounded-2xl', icon: 'size-6' },
  lg: { box: 'size-16 rounded-2xl', icon: 'size-8' },
};

type Props = {
  icon: ComponentType<{ className?: string }>;
  tone?: Tone;
  size?: Size;
  /** Animação suave (flutuar). Desliga sozinha com prefers-reduced-motion. */
  animated?: boolean;
  className?: string;
};

/** Ícone dentro de um selo arredondado, usado em títulos, cards e decorações */
export function IconBadge({
  icon: Icon,
  tone = 'azul',
  size = 'md',
  animated = false,
  className,
}: Props) {
  const s = SIZES[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        s.box,
        TONES[tone],
        animated && 'animate-flutuar',
        className,
      )}
    >
      <Icon className={s.icon} />
    </span>
  );
}
