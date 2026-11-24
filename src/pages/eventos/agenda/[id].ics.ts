/** Arquivo .ics de cada evento da agenda (gerado no build) */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { icsFile } from '@/lib/calendar';

export const getStaticPaths = (async () => {
  const all = await getCollection('agenda', ({ data }) => !data.draft);
  return all.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ entry: CollectionEntry<'agenda'> }> = ({ props }) => {
  const { entry } = props;
  const d = entry.data;
  const body = icsFile(
    {
      title: d.title,
      description: d.description,
      location: [d.location, d.address, d.city].filter(Boolean).join(', '),
      date: d.date,
      time: d.time,
      endTime: d.endTime,
    },
    entry.id,
  );
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${entry.id}.ics"`,
    },
  });
};
