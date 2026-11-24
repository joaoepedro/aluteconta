/**
 * Ponte entre as imagens otimizadas do Astro e os componentes React.
 * As páginas (.astro) chamam `responsiveImage()` e passam o resultado como
 * prop; os componentes React só renderizam <img> com srcset pronto.
 */
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type ResponsiveImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
};

export const SIZES = {
  card: '(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw',
  hero: '100vw',
  /** Manchete da página inicial: ~2/3 da largura no desktop */
  manchete: '(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 100vw',
  /** Miniatura das listas de notícias */
  lista: '(min-width: 640px) 160px, 112px',
  content: '(min-width: 896px) 832px, 100vw',
  thumb: '(min-width: 640px) 25vw, 50vw',
  logo: '160px',
} as const;

const WIDTHS = {
  card: [360, 540, 768],
  hero: [640, 1024, 1440, 1920],
  manchete: [480, 768, 1080, 1520],
  lista: [160, 320],
  content: [480, 832, 1280],
  thumb: [240, 360, 540],
  logo: [160, 320],
} as const;

export async function responsiveImage(
  src: ImageMetadata,
  alt: string,
  variant: keyof typeof SIZES = 'card',
): Promise<ResponsiveImage> {
  const fitting = WIDTHS[variant].filter((w) => w <= src.width);
  const result = await getImage({
    src,
    widths: fitting.length > 0 ? [...fitting] : [src.width],
    sizes: SIZES[variant],
    format: 'webp',
  });

  const width = Number(result.attributes['width'] ?? src.width);
  const height = Number(result.attributes['height'] ?? src.height);

  return {
    src: result.src,
    srcSet: result.srcSet.attribute,
    sizes: SIZES[variant],
    width,
    height,
    alt,
  };
}
