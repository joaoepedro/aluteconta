import { useState } from 'react';

type Props = { id: string; title: string };

/**
 * Vídeo do YouTube em modo leve: mostra só a miniatura e carrega o player
 * (≈1 MB de JavaScript do YouTube) apenas quando a pessoa clica.
 * Usar com client:visible.
 */
export function YouTubeLite({ id, title }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-noite relative mt-10 aspect-video overflow-hidden rounded-2xl">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Assistir ao vídeo: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            className="size-full object-cover opacity-90"
          />
          <span className="bg-laranja text-noite absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
