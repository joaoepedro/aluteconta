/**
 * Coleções de conteúdo. Cada arquivo .md dentro de src/content/<coleção>/
 * vira uma página. Os campos abaixo são validados no build: se faltar algo
 * obrigatório (ex.: texto alternativo da capa), o build para e diz o quê.
 *
 * Modelos prontos para copiar: src/content/_modelos/
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { EVENT_TYPES, INTERVIEW_CATEGORIES, PARTICIPANT_ROLES, keysOf } from '@/lib/taxonomy';

const mdFiles = (folder: string) =>
  glob({ base: `./src/content/${folder}`, pattern: '**/[^_]*.md' });

/** Campos comuns a tudo que vira página */
const base = {
  title: z.string().min(5).max(110),
  /** Resumo de 1 a 2 frases: aparece nos cards e na descrição do Google */
  description: z.string().min(40).max(200),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
};

/** Dia no formato AAAA-MM-DD (sem hora) */
const day = z.coerce.date();
/** Hora no formato HH:MM (horário de Brasília) */
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM, ex.: 19:30');

const link = z.object({ label: z.string(), url: z.url() });

/** YouTube: só o ID do vídeo (o que vem depois de v= ou youtu.be/) */
const youtubeId = z
  .string()
  .regex(/^[\w-]{11}$/, 'Use só o ID do vídeo do YouTube (11 caracteres)')
  .optional();

const entrevistas = defineCollection({
  loader: mdFiles('entrevistas'),
  schema: ({ image }) =>
    z.object({
      ...base,
      date: day,
      cover: image(),
      coverAlt: z.string().min(5),
      interviewee: z.object({
        name: z.string(),
        role: z.string(),
        company: z.string().optional(),
        city: z.string().optional(),
        links: z.array(link).default([]),
      }),
      category: z.enum(keysOf(INTERVIEW_CATEGORIES)),
      /** Série editorial recorrente, ex.: "Segredo do Chef" */
      series: z.string().optional(),
      /** Frase de destaque mostrada no card e no topo da página */
      quote: z.string().max(180).optional(),
      youtubeId,
    }),
});

const coberturas = defineCollection({
  loader: mdFiles('coberturas'),
  schema: ({ image }) =>
    z.object({
      ...base,
      date: day,
      location: z.string(),
      city: z.string().default('Franca'),
      organizer: z.string().optional(),
      eventType: z.enum(keysOf(EVENT_TYPES)),
      cover: image(),
      coverAlt: z.string().min(5),
      gallery: z.array(z.object({ src: image(), alt: z.string().min(5) })).default([]),
      youtubeId,
      /** Empresas/marcas citadas: liga com páginas de Marcas em Destaque */
      brands: z.array(reference('marcas')).default([]),
    }),
});

const edicoes = defineCollection({
  loader: mdFiles('cafe-conexao'),
  schema: ({ image }) =>
    z.object({
      ...base,
      /** Nome temático, ex.: "Outubro Rosa" */
      theme: z.string(),
      edition: z.number().int().positive().optional(),
      date: day,
      time: time.optional(),
      endTime: time.optional(),
      location: z.string(),
      address: z.string().optional(),
      city: z.string().default('Franca'),
      cover: image(),
      coverAlt: z.string().min(5),
      program: z.array(z.object({ time: z.string(), activity: z.string() })).default([]),
      guests: z
        .array(
          z.object({
            name: z.string(),
            role: z.string(),
            topic: z.string().optional(),
            photo: image().optional(),
            url: z.url().optional(),
          }),
        )
        .default([]),
      participants: z
        .array(
          z.object({
            name: z.string(),
            role: z.enum(keysOf(PARTICIPANT_ROLES)),
            brand: reference('marcas').optional(),
            instagram: z.url().optional(),
            whatsapp: z
              .string()
              .regex(/^\d{12,13}$/, 'Formato: 5516999999999')
              .optional(),
          }),
        )
        .default([]),
      /** Link de inscrição (Sympla ou outro). Sem link, mostra o formulário do site. */
      registrationUrl: z.url().optional(),
      price: z.string().optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string().min(5) })).default([]),
      youtubeId,
    }),
});

const marcas = defineCollection({
  loader: mdFiles('marcas'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string().min(40).max(200),
      segment: z.string(),
      city: z.string().default('Franca'),
      logo: image(),
      logoAlt: z.string().min(3),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      site: z.url().optional(),
      instagram: z.url().optional(),
      whatsapp: z
        .string()
        .regex(/^\d{12,13}$/, 'Formato: 5516999999999')
        .optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const agenda = defineCollection({
  loader: mdFiles('agenda'),
  schema: z.object({
    title: z.string(),
    description: z.string().min(20).max(200),
    date: day,
    time: time.optional(),
    endTime: time.optional(),
    location: z.string(),
    address: z.string().optional(),
    city: z.string().default('Franca'),
    organizer: z.string().optional(),
    url: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entrevistas, coberturas, edicoes, marcas, agenda };
