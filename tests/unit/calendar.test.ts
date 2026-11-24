import { describe, expect, it } from 'vitest';
import { googleCalendarUrl, icsFile } from '@/lib/calendar';

const base = {
  title: 'Café Conexão, Dia da Mulher',
  description: 'Roda de conversa; oficina',
  location: 'Espaço Exemplo, Franca',
  date: new Date('2027-03-13T00:00:00Z'),
};

describe('agenda', () => {
  it('monta link do Google Agenda com horário e fuso', () => {
    const url = new URL(googleCalendarUrl({ ...base, time: '09:00', endTime: '12:00' }));
    expect(url.hostname).toBe('calendar.google.com');
    expect(url.searchParams.get('dates')).toBe('20270313T090000/20270313T120000');
    expect(url.searchParams.get('ctz')).toBe('America/Sao_Paulo');
  });

  it('sem horário vira evento de dia inteiro', () => {
    const url = new URL(googleCalendarUrl(base));
    expect(url.searchParams.get('dates')).toBe('20270313/20270314');
  });

  it('gera .ics válido e escapa caracteres especiais', () => {
    const ics = icsFile(
      { ...base, time: '09:00' },
      'cafe-dia-da-mulher',
      new Date('2026-11-24T12:00:00Z'),
    );
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('DTSTART;TZID=America/Sao_Paulo:20270313T090000');
    expect(ics).toContain('DTEND;TZID=America/Sao_Paulo:20270313T110000');
    expect(ics).toContain('SUMMARY:Café Conexão\\, Dia da Mulher');
    expect(ics).toContain('DESCRIPTION:Roda de conversa\\; oficina');
    expect(ics.split('\r\n').at(-1)).toBe('END:VCALENDAR');
  });
});
