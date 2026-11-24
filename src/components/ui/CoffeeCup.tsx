import { cn } from './cn';

/** Xícara do Café Conexão (ilustração decorativa da marca). Passe a largura em className. */
export function CoffeeCup({ className }: { className?: string }) {
  return (
    <img
      src="/images/cafe/xicara.webp"
      alt=""
      aria-hidden="true"
      width={253}
      height={254}
      loading="lazy"
      decoding="async"
      className={cn('aspect-square h-auto', className)}
    />
  );
}
