/**
 * Pacotes e adicionais (valores de referência 2027).
 * Para mudar preço ou texto, altere só aqui.
 */
export type Package = {
  id: 'corporativo' | 'workshop' | 'confraternizacao';
  name: string;
  purpose: string;
  duration: string;
  price: number;
};

export type Addon = {
  name: string;
  price?: number;
  unit?: string;
  note?: string;
};

export const PACKAGES: Package[] = [
  {
    id: 'corporativo',
    name: 'Eventos corporativos',
    purpose: 'Imagem institucional e fortalecimento da marca',
    duration: 'Cobertura de até 1 hora',
    price: 650,
  },
  {
    id: 'workshop',
    name: 'Workshops, palestras e experiências',
    purpose: 'Conteúdo, conhecimento e autoridade',
    duration: 'Cobertura de até 1 hora',
    price: 550,
  },
  {
    id: 'confraternizacao',
    name: 'Festas e confraternizações',
    purpose: 'Registro social, emoção e entretenimento',
    duration: 'Cobertura de até 1 hora',
    price: 450,
  },
];

export const ADDONS: Addon[] = [
  { name: 'Hora adicional', price: 250, unit: 'por hora' },
  { name: 'Reel editado', price: 180 },
  { name: 'Entrevista', price: 150 },
  { name: 'Divulgação adicional', price: 100 },
  { name: 'Deslocamento', note: 'Até 20 km incluso' },
];

export const INCLUDED = [
  'Registro fotográfico e audiovisual',
  'Entrevistas e depoimentos',
  'Stories e vídeos curtos',
  'Divulgação nos canais A Lú Te Conta!',
];

export const formatBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
