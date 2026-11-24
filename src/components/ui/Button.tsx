import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'accent' | 'outline' | 'light';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // branco sobre azul: 10,7:1
  primary: 'bg-azul text-branco hover:bg-azul-escuro',
  // azul-noite sobre laranja: 5,9:1 (branco sobre laranja não passa no contraste)
  accent: 'bg-laranja text-noite hover:brightness-95',
  outline: 'border-2 border-azul text-azul hover:bg-azul hover:text-branco',
  light: 'bg-branco text-azul hover:bg-creme',
};

const SIZES: Record<Size, string> = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-7 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-60';

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = rest.href.startsWith('http');
  return (
    <a
      className={cn(base, VARIANTS[variant], SIZES[size], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only">, abre em nova aba</span>}
    </a>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
    </button>
  );
}
