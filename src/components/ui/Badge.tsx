import type { ReactNode } from 'react';
import { cn } from './cn';

type Tone = 'azul' | 'laranja' | 'creme';

const TONES: Record<Tone, string> = {
  azul: 'bg-azul/10 text-azul',
  laranja: 'bg-laranja text-noite', // 5,9:1
  creme: 'bg-creme text-noite',
};

export function Badge({
  tone = 'azul',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
