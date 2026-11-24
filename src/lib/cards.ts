/**
 * Converte entradas das coleções nos dados que os componentes recebem.
 * Único lugar que conhece as duas pontas (conteúdo ↔ componentes).
 */
import type { CollectionEntry } from 'astro:content';
import type {
  AgendaItemData,
  BrandCardData,
  CoverageCardData,
  EditionCardData,
  InterviewCardData,
  NewsItemData,
} from '@/components/content/types';
import { googleCalendarUrl } from './calendar';
import { dayBadge, formatDay, isUpcoming, isoDay } from './dates';
import { responsiveImage, type SIZES } from './images';
import { EVENT_TYPES, INTERVIEW_CATEGORIES } from './taxonomy';

export const paths = {
  entrevista: (id: string) => `/entrevistas/${id}`,
  cobertura: (id: string) => `/eventos/${id}`,
  edicao: (id: string) => `/cafe-conexao/${id}`,
  marca: (id: string) => `/para-marcas/marcas/${id}`,
  ics: (id: string) => `/eventos/agenda/${id}.ics`,
};

export async function toInterviewCard(
  e: CollectionEntry<'entrevistas'>,
): Promise<InterviewCardData> {
  const { data } = e;
  return {
    href: paths.entrevista(e.id),
    title: data.title,
    description: data.description,
    image: await responsiveImage(data.cover, data.coverAlt, 'card'),
    personName: data.interviewee.name,
    personRole: [data.interviewee.role, data.interviewee.company].filter(Boolean).join(' · '),
    category: INTERVIEW_CATEGORIES[data.category],
    dateLabel: formatDay(data.date),
    isoDate: isoDay(data.date),
    quote: data.quote,
    series: data.series,
  };
}

export async function toCoverageCard(e: CollectionEntry<'coberturas'>): Promise<CoverageCardData> {
  const { data } = e;
  return {
    href: paths.cobertura(e.id),
    title: data.title,
    description: data.description,
    image: await responsiveImage(data.cover, data.coverAlt, 'card'),
    eventType: EVENT_TYPES[data.eventType],
    dateLabel: formatDay(data.date),
    isoDate: isoDay(data.date),
    location: `${data.location}, ${data.city}`,
  };
}

export async function toEditionCard(
  e: CollectionEntry<'edicoes'>,
  now = new Date(),
): Promise<EditionCardData> {
  const { data } = e;
  return {
    href: paths.edicao(e.id),
    title: data.title,
    description: data.description,
    image: await responsiveImage(data.cover, data.coverAlt, 'card'),
    theme: data.theme,
    edition: data.edition,
    dateLabel: formatDay(data.date),
    isoDate: isoDay(data.date),
    location: `${data.location}, ${data.city}`,
    upcoming: isUpcoming(data.date, data.endTime, now),
  };
}

export async function toBrandCard(e: CollectionEntry<'marcas'>): Promise<BrandCardData> {
  const { data } = e;
  return {
    href: paths.marca(e.id),
    name: data.name,
    segment: data.segment,
    description: data.description,
    logo: await responsiveImage(data.logo, data.logoAlt, 'logo'),
  };
}

export function toAgendaItem(e: CollectionEntry<'agenda'>): AgendaItemData {
  const { data } = e;
  const badge = dayBadge(data.date);
  const timeLabel = data.time
    ? data.endTime
      ? `${data.time} às ${data.endTime}`
      : `${data.time}`
    : undefined;
  const location = `${data.location}, ${data.city}`;
  return {
    id: e.id,
    title: data.title,
    description: data.description,
    day: badge.day,
    month: badge.month,
    isoDate: isoDay(data.date),
    timeLabel,
    location,
    googleCalendarUrl: googleCalendarUrl({
      title: data.title,
      description: data.description,
      location: data.address ? `${data.location}, ${data.address}, ${data.city}` : location,
      date: data.date,
      time: data.time,
      endTime: data.endTime,
    }),
    icsHref: paths.ics(e.id),
  };
}

export const mapAll = <T, R>(items: T[], fn: (item: T) => Promise<R>) => Promise.all(items.map(fn));

type FeedEntry = CollectionEntry<'entrevistas'> | CollectionEntry<'coberturas'>;

/** Entrevista ou cobertura no formato de notícia (manchete e listas) */
export async function toNewsItem(
  e: FeedEntry,
  variant: keyof typeof SIZES = 'lista',
): Promise<NewsItemData> {
  const common = {
    id: `${e.collection}/${e.id}`,
    title: e.data.title,
    description: e.data.description,
    image: await responsiveImage(e.data.cover, e.data.coverAlt, variant),
    dateLabel: formatDay(e.data.date),
    isoDate: isoDay(e.data.date),
  };
  if (e.collection === 'entrevistas') {
    return {
      ...common,
      href: paths.entrevista(e.id),
      kind: 'Entrevista',
      kicker: INTERVIEW_CATEGORIES[e.data.category],
    };
  }
  return {
    ...common,
    href: paths.cobertura(e.id),
    kind: 'Evento',
    kicker: EVENT_TYPES[e.data.eventType],
  };
}
