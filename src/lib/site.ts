/**
 * Dados da marca usados no site inteiro (cabeçalho, rodapé, SEO, schema).
 * Mude aqui e o site todo acompanha.
 */
export const SITE = {
  name: 'A Lú Te Conta!',
  shortName: 'A Lú Te Conta',
  tagline: 'Comunicação e Conteúdo',
  description:
    'Entrevistas, cobertura de eventos e o projeto Café Conexão. Comunicação e conteúdo para pessoas, marcas e eventos em Franca e região.',
  url: 'https://aluteconta.com.br',
  locale: 'pt_BR',
  lang: 'pt-BR',
  timeZone: 'America/Sao_Paulo',

  person: {
    name: 'Luciene Moraes',
    nickname: 'Lú',
    jobTitle: 'Comunicadora, colunista social digital e apresentadora',
  },

  address: {
    city: 'Franca',
    region: 'SP',
    country: 'BR',
  },
  areaServed: ['Franca', 'Ribeirão Preto', 'Região de Franca'],

  contact: {
    whatsapp: '5516994156972',
    email: 'contato@aluteconta.com.br', // TODO: confirmar e-mail com a cliente
  },

  social: {
    instagram: 'https://www.instagram.com/colunistalucienemoraes',
    instagramHandle: '@colunistalucienemoraes',
    youtube: 'https://www.youtube.com/@aluteconta',
  },

  defaultOgImage: '/og/padrao.jpg',

  /** Mostrar valores dos pacotes na página Para Marcas (decisão da cliente). */
  showPrices: true,
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
