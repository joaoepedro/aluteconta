/**
 * Dados estruturados (JSON-LD) para o Google. Cada função devolve um objeto
 * schema.org; o componente <JsonLd> só serializa.
 */
import { SITE } from './site';
import { toBrazilIso } from './dates';

export const absoluteUrl = (path: string) => new URL(path, SITE.url).toString();

const ORG_ID = `${SITE.url}/#organizacao`;
const PERSON_ID = `${SITE.url}/#luciene-moraes`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE.url,
    logo: absoluteUrl('/icon-512.png'),
    image: absoluteUrl(SITE.defaultOgImage),
    telephone: `+${SITE.contact.whatsapp}`,
    email: SITE.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
    founder: { '@id': PERSON_ID },
    sameAs: [SITE.social.instagram, SITE.social.youtube],
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.person.name,
    alternateName: SITE.person.nickname,
    jobTitle: SITE.person.jobTitle,
    worksFor: { '@id': ORG_ID },
    url: absoluteUrl('/sobre'),
    sameAs: [SITE.social.instagram, SITE.social.youtube],
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  date: Date;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: toBrazilIso(input.date),
    image: [absoluteUrl(input.image)],
    mainEntityOfPage: absoluteUrl(input.path),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.lang,
  };
}

export function eventSchema(input: {
  name: string;
  description: string;
  path: string;
  date: Date;
  time?: string | undefined;
  endTime?: string | undefined;
  location: string;
  address?: string | undefined;
  city: string;
  image?: string | undefined;
  registrationUrl?: string | undefined;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    startDate: toBrazilIso(input.date, input.time),
    ...(input.endTime ? { endDate: toBrazilIso(input.date, input.endTime) } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: input.location,
      address: {
        '@type': 'PostalAddress',
        ...(input.address ? { streetAddress: input.address } : {}),
        addressLocality: input.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
    },
    ...(input.image ? { image: [absoluteUrl(input.image)] } : {}),
    organizer: { '@id': ORG_ID },
    ...(input.registrationUrl
      ? {
          offers: {
            '@type': 'Offer',
            url: input.registrationUrl,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

export type Crumb = { label: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}
