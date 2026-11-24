import type { ResponsiveImage } from '@/lib/images';
import { cn } from './cn';

type Props = {
  image: ResponsiveImage;
  className?: string;
  /** true só para a imagem principal acima da dobra (melhora o LCP) */
  priority?: boolean;
};

export function Img({ image, className, priority = false }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn('h-full w-full object-cover', className)}
    />
  );
}
