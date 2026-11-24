/**
 * Datas do conteúdo são "dias" (AAAA-MM-DD) lidos como meia-noite UTC.
 * Por isso formatamos dias em UTC: assim 2026-12-12 nunca vira 11/12
 * no fuso de Brasília.
 */
const BR_OFFSET = '-03:00';

const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortDayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
});

/** "12 de dezembro de 2026" */
export const formatDay = (date: Date) => dayFormatter.format(date);

/** { day: "12", month: "dez." } para selos de data */
export function dayBadge(date: Date) {
  const parts = shortDayFormatter.formatToParts(date);
  return {
    day: parts.find((p) => p.type === 'day')?.value ?? '',
    month: (parts.find((p) => p.type === 'month')?.value ?? '').replace('.', ''),
  };
}

/** "2026-12-12" */
export const isoDay = (date: Date) => date.toISOString().slice(0, 10);

/** Data + hora de Brasília em ISO 8601 com fuso: "2026-12-12T19:30:00-03:00" */
export function toBrazilIso(date: Date, time?: string): string {
  return time ? `${isoDay(date)}T${time}:00${BR_OFFSET}` : isoDay(date);
}

/** Converte dia + hora de Brasília para um Date absoluto */
export function toInstant(date: Date, time = '23:59'): Date {
  return new Date(`${isoDay(date)}T${time}:00${BR_OFFSET}`);
}

/** O evento ainda não terminou? (compara com o fim do dia/horário em Brasília) */
export function isUpcoming(date: Date, endTime?: string, now = new Date()): boolean {
  return toInstant(date, endTime ?? '23:59').getTime() >= now.getTime();
}
