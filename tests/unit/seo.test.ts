import { describe, expect, it } from 'vitest';
import { breadcrumbSchema, eventSchema, organizationSchema } from '@/lib/seo';

describe('dados estruturados', () => {
  it('organização local com cidade e área atendida', () => {
    const org = organizationSchema();
    expect(org['@type']).toBe('LocalBusiness');
    expect(org.address.addressLocality).toBe('Franca');
    expect(org.areaServed.length).toBeGreaterThan(0);
  });

  it('evento com data no fuso de Brasília e endereço', () => {
    const ev = eventSchema({
      name: 'Café Conexão',
      description: 'Encontro',
      path: '/cafe-conexao/teste',
      date: new Date('2027-03-13T00:00:00Z'),
      time: '09:00',
      endTime: '12:00',
      location: 'Espaço',
      city: 'Franca',
    });
    expect(ev.startDate).toBe('2027-03-13T09:00:00-03:00');
    expect(ev.endDate).toBe('2027-03-13T12:00:00-03:00');
    expect(ev.url).toBe('https://aluteconta.com.br/cafe-conexao/teste');
  });

  it('breadcrumb com posições e URLs absolutas', () => {
    const bc = breadcrumbSchema([
      { label: 'Início', href: '/' },
      { label: 'Entrevistas', href: '/entrevistas' },
    ]);
    expect(bc.itemListElement[1]).toMatchObject({
      position: 2,
      item: 'https://aluteconta.com.br/entrevistas',
    });
  });
});
