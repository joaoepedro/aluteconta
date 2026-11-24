import { Img } from '../ui/Img';
import type { BrandCardData } from './types';

export function BrandCard({ item }: { item: BrandCardData }) {
  return (
    <article className="border-borda bg-branco relative flex h-full flex-col gap-4 rounded-2xl border p-5 transition-shadow focus-within:shadow-lg hover:shadow-lg">
      <div className="bg-creme size-20 overflow-hidden rounded-xl">
        <Img image={item.logo} className="object-contain p-2" />
      </div>
      <div>
        <p className="text-laranja-texto text-xs font-semibold tracking-wide uppercase">
          {item.segment}
        </p>
        <h3 className="text-noite mt-1 text-lg">
          <a
            href={item.href}
            className="after:absolute after:inset-0 hover:underline focus:outline-none"
          >
            {item.name}
          </a>
        </h3>
        <p className="text-noite/80 mt-2 line-clamp-3 text-sm">{item.description}</p>
      </div>
    </article>
  );
}
