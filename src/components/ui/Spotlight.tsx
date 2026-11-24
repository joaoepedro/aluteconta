import type { ComponentType } from 'react';
import { SparkleIcon } from './icons';
import { cn } from './cn';

type IconType = ComponentType<{ className?: string }>;

type Props = {
  icon: IconType;
  /** Até dois ícones menores que flutuam ao redor */
  accents?: [IconType?, IconType?];
  /** Cores: azul (padrão) ou laranja no círculo principal */
  tone?: 'azul' | 'laranja';
  className?: string;
};

/**
 * Composição decorativa para o topo das páginas: ícone grande num círculo,
 * anel tracejado, brilhos e selos flutuando. Só CSS, sem imagem externa.
 */
export function Spotlight({ icon: Icon, accents = [], tone = 'azul', className }: Props) {
  const [A, B] = accents;
  return (
    <div aria-hidden="true" className={cn('relative size-56 shrink-0', className)}>
      <div className="border-laranja/60 absolute inset-2 rounded-full border-2 border-dashed" />
      <div
        className={cn(
          'absolute inset-8 flex items-center justify-center rounded-full shadow-xl',
          tone === 'azul' ? 'bg-azul text-branco' : 'bg-laranja text-noite',
        )}
      >
        <Icon className="size-20" />
      </div>
      <SparkleIcon className="text-laranja animate-brilhar absolute top-2 right-6 size-7" />
      <SparkleIcon className="text-brilho animate-brilhar absolute bottom-6 left-0 size-5 [animation-delay:1.2s]" />
      {A && (
        <span className="bg-branco text-azul animate-flutuar absolute top-10 -left-2 flex size-12 items-center justify-center rounded-2xl shadow-lg">
          <A className="size-6" />
        </span>
      )}
      {B && (
        <span className="bg-laranja text-noite animate-flutuar-lento absolute -right-2 bottom-8 flex size-12 items-center justify-center rounded-2xl shadow-lg [animation-delay:1.5s]">
          <B className="size-6" />
        </span>
      )}
    </div>
  );
}
