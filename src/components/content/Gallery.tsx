import { Img } from '../ui/Img';
import type { GalleryImage } from './types';

/**
 * Galeria sem JavaScript: miniaturas otimizadas que abrem a foto inteira.
 * Leve para o celular e funciona mesmo com JS desligado.
 */
export function Gallery({
  images,
  title = 'Galeria de fotos',
}: {
  images: GalleryImage[];
  title?: string;
}) {
  if (images.length === 0) return null;
  return (
    <section aria-labelledby="galeria" className="mt-12">
      <h2 id="galeria" className="mb-5 text-2xl">
        {title}
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.full} className="bg-creme aspect-square overflow-hidden rounded-xl">
            <a
              href={img.full}
              className="block h-full"
              aria-label={`Ampliar foto ${i + 1}: ${img.thumb.alt}`}
            >
              <Img
                image={img.thumb}
                className="transition-transform duration-300 hover:scale-105"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
