/**
 * Formatos de dados que os componentes de conteúdo recebem.
 * Componentes não leem coleções: as páginas montam estes objetos
 * (ver src/lib/cards.ts) e passam por props.
 */
import type { ResponsiveImage } from '@/lib/images';

export type CardBase = {
  href: string;
  title: string;
  description: string;
  image: ResponsiveImage;
};

export type InterviewCardData = CardBase & {
  personName: string;
  personRole: string;
  category: string;
  dateLabel: string;
  isoDate: string;
  quote?: string | undefined;
  series?: string | undefined;
};

export type CoverageCardData = CardBase & {
  eventType: string;
  dateLabel: string;
  isoDate: string;
  location: string;
};

export type EditionCardData = CardBase & {
  theme: string;
  edition?: number | undefined;
  dateLabel: string;
  isoDate: string;
  location: string;
  upcoming: boolean;
};

export type BrandCardData = {
  href: string;
  name: string;
  segment: string;
  description: string;
  logo: ResponsiveImage;
};

export type AgendaItemData = {
  id: string;
  title: string;
  description: string;
  day: string;
  month: string;
  isoDate: string;
  timeLabel?: string | undefined;
  location: string;
  googleCalendarUrl: string;
  icsHref: string;
};

export type GalleryImage = { thumb: ResponsiveImage; full: string };

/** Publicação no formato de portal (manchete e listas da página inicial) */
export type NewsItemData = CardBase & {
  id: string;
  /** Tipo de publicação: "Entrevista" ou "Evento" */
  kind: string;
  /** Categoria (entrevistas) ou tipo de evento (coberturas) */
  kicker: string;
  dateLabel: string;
  isoDate: string;
};
