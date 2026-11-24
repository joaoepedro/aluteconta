/**
 * Consultas de conteúdo. Páginas usam estas funções em vez de chamar
 * getCollection direto, para que rascunhos e ordenação sejam sempre iguais.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { isUpcoming } from './dates';

type Dated = 'entrevistas' | 'coberturas' | 'edicoes';

const newestFirst = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

const oldestFirst = <T extends { data: { date: Date } }>(a: T, b: T) =>
  a.data.date.getTime() - b.data.date.getTime();

/** Publicados (sem rascunhos), do mais novo para o mais antigo */
export async function getPublished<C extends Dated>(collection: C): Promise<CollectionEntry<C>[]> {
  const entries = (await getCollection(
    collection,
    ({ data }) => !data.draft,
  )) as CollectionEntry<C>[];
  return entries.sort(newestFirst);
}

export async function getLatest<C extends Dated>(collection: C, limit: number) {
  return (await getPublished(collection)).slice(0, limit);
}

/** Próximas edições do Café Conexão (a mais próxima primeiro) */
export async function getUpcomingEditions(now = new Date()) {
  const all = await getPublished('edicoes');
  return all.filter((e) => isUpcoming(e.data.date, e.data.endTime, now)).sort(oldestFirst);
}

export async function getPastEditions(now = new Date()) {
  const all = await getPublished('edicoes');
  return all.filter((e) => !isUpcoming(e.data.date, e.data.endTime, now));
}

/** Agenda: só eventos que ainda não aconteceram, em ordem de data */
export async function getUpcomingAgenda(now = new Date()) {
  const all = await getCollection('agenda', ({ data }) => !data.draft);
  return all.filter((e) => isUpcoming(e.data.date, e.data.endTime, now)).sort(oldestFirst);
}

export async function getBrands({ featuredOnly = false } = {}) {
  const all = await getCollection(
    'marcas',
    ({ data }) => !data.draft && (!featuredOnly || data.featured),
  );
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, 'pt-BR'));
}
