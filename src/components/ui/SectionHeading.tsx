import type { ComponentType, ReactNode } from 'react';
import { ArrowRightIcon } from './icons';
import { IconBadge } from './IconBadge';
import { cn } from './cn';

type Props = {
  eyebrow?: string;
  /** Ícone ao lado do sobretítulo */
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: ReactNode;
  /** Link "ver todos" à direita */
  action?: { label: string; href: string };
  level?: 'h1' | 'h2';
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
  action,
  level = 'h2',
  id,
  className,
}: Props) {
  const Heading = level;
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {(eyebrow || icon) && (
          <div className="mb-3 flex items-center gap-3">
            {icon && <IconBadge icon={icon} size="sm" />}
            {eyebrow && (
              <p className="text-laranja-texto text-sm font-semibold tracking-wide uppercase">
                {eyebrow}
              </p>
            )}
          </div>
        )}
        <Heading
          id={id}
          className={level === 'h1' ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'}
        >
          {title}
        </Heading>
        {description && <div className="text-cinza mt-3 text-lg">{description}</div>}
      </div>
      {action && (
        <a
          href={action.href}
          className="text-azul group inline-flex shrink-0 items-center gap-1 font-semibold underline"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}
