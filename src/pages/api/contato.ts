/**
 * Recebe os formulários do site. Roda na Cloudflare (não é pré-gerado).
 * Segredos: RESEND_API_KEY e TURNSTILE_SECRET_KEY (npx wrangler secret put ...).
 */
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { buildEmail, formSchema } from '@/lib/forms';

export const prerender = false;

type Env = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function verifyTurnstile(secret: string, token: string | undefined, ip: string | null) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const POST: APIRoute = async ({ request }) => {
  const vars = env as unknown as Env;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(400, { error: 'Dados inválidos.' });
  }

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return json(422, { error: first?.message ?? 'Confira os campos do formulário.' });
  }
  const data = parsed.data;

  // Robô preencheu o campo-isca: responde "ok" sem enviar nada
  if (data.website) return json(200, { ok: true });

  if (vars.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(
      vars.TURNSTILE_SECRET_KEY,
      data['cf-turnstile-response'],
      request.headers.get('CF-Connecting-IP'),
    );
    if (!ok)
      return json(400, {
        error: 'Não conseguimos confirmar que você não é um robô. Tente de novo.',
      });
  }

  const { subject, text } = buildEmail(data);

  if (!vars.RESEND_API_KEY) {
    // Sem chave configurada (ambiente local): mostra no terminal em vez de enviar
    console.log('[formulário]', subject, '\n', text);
    return json(200, { ok: true, dev: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${vars.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Site A Lú Te Conta <${vars.CONTACT_FROM_EMAIL ?? 'site@aluteconta.com.br'}>`,
      to: [vars.CONTACT_TO_EMAIL ?? 'contato@aluteconta.com.br'],
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[formulário] falha no envio', res.status, await res.text());
    return json(502, { error: 'Não foi possível enviar agora. Tente pelo WhatsApp.' });
  }

  return json(200, { ok: true });
};

export const ALL: APIRoute = () => json(405, { error: 'Método não permitido.' });
