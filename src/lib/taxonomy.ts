/**
 * Categorias fixas do site. Para criar uma nova categoria, adicione aqui:
 * o schema (content.config.ts), os filtros e os rótulos usam esta lista.
 */
export const INTERVIEW_CATEGORIES = {
  'empreendedores-e-empresas': 'Empreendedores e empresas',
  'artistas-e-cultura': 'Artistas e cultura',
  'profissionais-autonomos': 'Profissionais autônomos',
  personalidades: 'Personalidades',
} as const;

export const EVENT_TYPES = {
  corporativo: 'Corporativo',
  premiacao: 'Premiação',
  inauguracao: 'Inauguração',
  lancamento: 'Lançamento de produto',
  comemorativo: 'Comemorativo',
  institucional: 'Institucional e comunidade',
  confraternizacao: 'Festa e confraternização',
  workshop: 'Workshop e palestra',
} as const;

export const PARTICIPANT_ROLES = {
  participante: 'Participante',
  expositor: 'Expositor',
  patrocinador: 'Patrocinador',
  apoiador: 'Apoiador',
} as const;

export const PARTICIPANT_ROLES_PLURAL: Record<keyof typeof PARTICIPANT_ROLES, string> = {
  participante: 'Participantes',
  expositor: 'Expositores',
  patrocinador: 'Patrocinadores',
  apoiador: 'Apoiadores',
};

export type InterviewCategory = keyof typeof INTERVIEW_CATEGORIES;
export type EventType = keyof typeof EVENT_TYPES;
export type ParticipantRole = keyof typeof PARTICIPANT_ROLES;

export const keysOf = <T extends Record<string, string>>(obj: T) =>
  Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]];
