import { useId } from 'react';
import { cn } from './cn';

/**
 * Xícara do Café Conexão (ilustração da marca) com vapor contínuo.
 *
 * Dois fios de vapor saem do café e ondulam sem parar: a forma do fio muda
 * devagar (SMIL <animate>, funciona em todos os navegadores sem JavaScript),
 * um fluxo sutil sobe pelo fio (stroke-dashoffset em CSS) e as pontas esmaecem
 * (máscara em degradê). Borda desfocada para combinar com a arte em aquarela.
 *
 * Coordenadas no quadro original da arte (1440 × 1600): café ≈ x 160–930, y 490–760.
 * Com "reduzir movimento" ativado, mostra o vapor parado (ver global.css).
 */

// Formas de cada fio (mesma estrutura de comandos para poder interpolar)
const FIO_1 = [
  'M470 640C385 540 555 465 465 365S380 195 455 50',
  'M470 640C555 545 385 460 485 360S540 190 420 50',
  'M470 640C410 550 530 455 450 370S405 200 480 50',
];
const FIO_2 = [
  'M720 650C805 560 645 485 735 395S815 235 760 110',
  'M720 650C635 555 805 475 710 390S675 230 790 110',
  'M720 650C785 565 665 480 745 400S795 240 740 110',
];

const loop = (shapes: string[]) => [...shapes, shapes[0]].join(';');
const SPLINE = '0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1';

function Fio({ shapes, dur, begin }: { shapes: string[]; dur: string; begin: string }) {
  return (
    <g>
      {/* corpo do vapor: tom acinzentado, largo e desfocado */}
      <path
        d={shapes[0]}
        className="xicara-vapor-corpo"
        stroke="#8fb3bb"
        strokeWidth="52"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values={loop(shapes)}
          keyTimes="0;0.33;0.66;1"
          calcMode="spline"
          keySplines={SPLINE}
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
      </path>
      {/* brilho interno claro, mais fino */}
      <path
        d={shapes[0]}
        className="xicara-vapor-brilho"
        stroke="#ffffff"
        strokeWidth="18"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values={loop(shapes)}
          keyTimes="0;0.33;0.66;1"
          calcMode="spline"
          keySplines={SPLINE}
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

export function CoffeeCup({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const mask = `xicara-mascara-${id}`;
  const fade = `xicara-degrade-${id}`;
  const blur = `xicara-desfoque-${id}`;

  return (
    <div aria-hidden="true" className={cn('xicara relative aspect-[9/10] w-40', className)}>
      <img
        src="/images/cafe/xicara-400.webp"
        srcSet="/images/cafe/xicara-400.webp 400w, /images/cafe/xicara-800.webp 800w"
        sizes="(min-width: 1024px) 200px, 160px"
        alt=""
        width={400}
        height={343}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 bottom-0 w-full"
      />

      <svg
        viewBox="0 0 1440 1600"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* esmaece no café (embaixo) e no alto */}
          <linearGradient id={fade} gradientUnits="userSpaceOnUse" x1="0" y1="660" x2="0" y2="40">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.22" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="700">
            <rect x="0" y="0" width="1440" height="700" fill={`url(#${fade})`} />
          </mask>
          <filter id={blur} x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <g mask={`url(#${mask})`} filter={`url(#${blur})`} className="xicara-vapor">
          <Fio shapes={FIO_1} dur="6s" begin="0s" />
          <Fio shapes={FIO_2} dur="7.5s" begin="-2s" />
        </g>

        {/* versão parada, usada só com "reduzir movimento" (a ondulação SMIL não obedece ao CSS) */}
        <g mask={`url(#${mask})`} filter={`url(#${blur})`} className="xicara-vapor-estatico">
          {[FIO_1[0], FIO_2[0]].map((d) => (
            <g key={d}>
              <path d={d} stroke="#8fb3bb" strokeWidth="52" strokeLinecap="round" opacity="0.75" />
              <path d={d} stroke="#ffffff" strokeWidth="18" strokeLinecap="round" opacity="0.55" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
