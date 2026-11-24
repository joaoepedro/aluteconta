import { ArrowRightIcon } from '../ui/icons';

/** Título de seção estilo portal: nome à esquerda, filete azul e "Ver todas" */
export function SectionBar({
  id,
  title,
  action,
}: {
  id: string;
  title: string;
  action?: { label: string; href: string } | undefined;
}) {
  return (
    <div className="border-azul mb-2 flex items-end justify-between gap-4 border-b-2 pb-2">
      <h2 id={id} className="text-azul text-xl sm:text-2xl">
        {title}
      </h2>
      {action && (
        <a
          href={action.href}
          className="text-azul inline-flex items-center gap-1 text-sm font-semibold whitespace-nowrap hover:underline"
        >
          {action.label}
          <span className="sr-only"> — {title}</span>
          <ArrowRightIcon className="size-4" />
        </a>
      )}
    </div>
  );
}
