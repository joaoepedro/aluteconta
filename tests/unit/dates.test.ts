import { describe, expect, it } from 'vitest';
import { dayBadge, formatDay, isUpcoming, toBrazilIso } from '@/lib/dates';

// Datas do conteúdo chegam como meia-noite UTC (YAML: 2026-12-12)
const day = (iso: string) => new Date(`${iso}T00:00:00Z`);

describe('datas', () => {
  it('formata o dia sem voltar um dia no fuso de Brasília', () => {
    expect(formatDay(day('2026-12-12'))).toBe('12 de dezembro de 2026');
  });

  it('gera selo de dia e mês', () => {
    expect(dayBadge(day('2027-03-08'))).toEqual({ day: '08', month: 'mar' });
  });

  it('gera ISO com fuso de Brasília', () => {
    expect(toBrazilIso(day('2027-03-13'), '09:00')).toBe('2027-03-13T09:00:00-03:00');
    expect(toBrazilIso(day('2027-03-13'))).toBe('2027-03-13');
  });

  it('considera o evento futuro até o horário de término em Brasília', () => {
    const date = day('2027-03-13');
    expect(isUpcoming(date, '12:00', new Date('2027-03-13T14:59:00Z'))).toBe(true); // 11:59 em Brasília
    expect(isUpcoming(date, '12:00', new Date('2027-03-13T15:01:00Z'))).toBe(false); // 12:01 em Brasília
    expect(isUpcoming(date, undefined, new Date('2027-03-14T02:00:00Z'))).toBe(true); // 23:00 do dia 13
  });
});
