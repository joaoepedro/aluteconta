/**
 * Validação dos formulários no servidor (Cloudflare). O navegador faz a
 * validação básica com HTML (required, type="email"); aqui é a palavra final.
 */
import { z } from 'astro/zod';

const phone = z
  .string()
  .trim()
  .regex(/^[\d\s()+-]{10,20}$/, 'Informe um telefone com DDD');

const common = {
  name: z.string().trim().min(2, 'Informe seu nome').max(120),
  email: z.email('E-mail inválido'),
  phone: phone.optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  /** Campo-isca: pessoas não veem, robôs preenchem */
  website: z.literal('').optional(),
  'cf-turnstile-response': z.string().optional(),
};

export const quoteSchema = z.object({
  form: z.literal('orcamento'),
  ...common,
  company: z.string().trim().max(120).optional().or(z.literal('')),
  package: z.enum(['corporativo', 'workshop', 'confraternizacao', 'outro']),
  eventDate: z.string().optional().or(z.literal('')),
  eventCity: z.string().trim().max(120).optional().or(z.literal('')),
  addons: z.array(z.string()).default([]),
});

export const cafeSchema = z.object({
  form: z.literal('cafe-conexao'),
  ...common,
  interest: z.enum(['participar', 'expor', 'palestrar', 'patrocinar']),
  edition: z.string().optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
});

export const formSchema = z.discriminatedUnion('form', [quoteSchema, cafeSchema]);
export type FormPayload = z.infer<typeof formSchema>;

const LABELS: Record<string, string> = {
  corporativo: 'Evento corporativo',
  workshop: 'Workshop, palestra ou experiência',
  confraternizacao: 'Festa ou confraternização',
  outro: 'Outro',
  participar: 'Quero participar',
  expor: 'Quero expor minha marca',
  palestrar: 'Quero ser convidado(a) para falar',
  patrocinar: 'Quero patrocinar ou apoiar',
};

/** Monta assunto e corpo do e-mail que chega para a Lú */
export function buildEmail(data: FormPayload): { subject: string; text: string } {
  const lines: [string, string | undefined][] = [
    ['Nome', data.name],
    ['E-mail', data.email],
    ['Telefone/WhatsApp', data.phone || undefined],
    ['Empresa', data.company || undefined],
  ];

  if (data.form === 'orcamento') {
    lines.push(
      ['Pacote', LABELS[data.package]],
      ['Data do evento', data.eventDate || undefined],
      ['Cidade/local', data.eventCity || undefined],
      ['Adicionais', data.addons.length ? data.addons.join(', ') : undefined],
    );
  } else {
    lines.push(['Interesse', LABELS[data.interest]], ['Edição', data.edition || undefined]);
  }

  lines.push(['Mensagem', data.message || undefined]);

  const subject =
    data.form === 'orcamento'
      ? `Pedido de orçamento: ${LABELS[data.package]} — ${data.name}`
      : `Café Conexão: ${LABELS[data.interest]} — ${data.name}`;

  const text = lines
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  return { subject, text: `${text}\n\n— Enviado pelo site aluteconta.com.br` };
}
