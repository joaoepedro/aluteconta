/**
 * "Adicionar à minha agenda" sem integração: link do Google Agenda e arquivo .ics.
 */
import { isoDay } from './dates';

export type CalendarEvent = {
  title: string;
  description?: string | undefined;
  location?: string | undefined;
  date: Date;
  time?: string | undefined;
  endTime?: string | undefined;
  url?: string | undefined;
};

const compact = (d: string) => d.replace(/[-:]/g, '');

/** Datas no formato do Google/ICS. Sem hora → evento de dia inteiro. */
function range(e: CalendarEvent): { start: string; end: string; allDay: boolean } {
  const day = compact(isoDay(e.date));
  if (!e.time) {
    const next = new Date(e.date.getTime() + 86_400_000);
    return { start: day, end: compact(isoDay(next)), allDay: true };
  }
  const end = e.endTime ?? addHours(e.time, 2);
  return { start: `${day}T${compact(e.time)}00`, end: `${day}T${compact(end)}00`, allDay: false };
}

function addHours(time: string, hours: number): string {
  const [h = 0, m = 0] = time.split(':').map(Number);
  const total = Math.min(h + hours, 23);
  return `${String(total).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function googleCalendarUrl(e: CalendarEvent): string {
  const { start, end } = range(e);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${start}/${end}`,
    ctz: 'America/Sao_Paulo',
  });
  if (e.description) params.set('details', e.url ? `${e.description}\n\n${e.url}` : e.description);
  if (e.location) params.set('location', e.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export function icsFile(e: CalendarEvent, uid: string, now = new Date()): string {
  const { start, end, allDay } = range(e);
  const stamp = now
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const dt = (prop: string, value: string) =>
    allDay ? `${prop};VALUE=DATE:${value}` : `${prop};TZID=America/Sao_Paulo:${value}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//A Lú Te Conta//Agenda//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}@aluteconta.com.br`,
    `DTSTAMP:${stamp}`,
    dt('DTSTART', start),
    dt('DTEND', end),
    `SUMMARY:${escapeIcs(e.title)}`,
    e.description ? `DESCRIPTION:${escapeIcs(e.description)}` : '',
    e.location ? `LOCATION:${escapeIcs(e.location)}` : '',
    e.url ? `URL:${e.url}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}
