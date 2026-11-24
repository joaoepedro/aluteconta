import type { ElementType, ReactNode } from 'react';
import { cn } from './cn';

type Props = {
  as?: ElementType;
  size?: 'text' | 'default' | 'wide';
  className?: string;
  children: ReactNode;
};

const SIZES = { text: 'max-w-3xl', default: 'max-w-6xl', wide: 'max-w-7xl' };

export function Container({ as: Tag = 'div', size = 'default', className, children }: Props) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6', SIZES[size], className)}>{children}</Tag>
  );
}
