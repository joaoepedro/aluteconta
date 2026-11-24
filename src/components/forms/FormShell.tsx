import { useEffect, useRef, type SubmitEvent, type ReactNode } from 'react';
import { whatsappLink } from '@/lib/site';
import { Button } from '../ui/Button';
import { Honeypot } from './fields';
import type { FormStatus } from './useFormSubmit';

type Props = {
  status: FormStatus;
  error: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  submitLabel: string;
  successMessage: string;
  whatsappMessage: string;
  turnstileSiteKey?: string | undefined;
  children: ReactNode;
};

/**
 * Estrutura comum dos formulários: campos, anti-spam (Turnstile + isca),
 * botão, mensagens de status anunciadas para leitores de tela e atalho de WhatsApp.
 */
export function FormShell({
  status,
  error,
  onSubmit,
  submitLabel,
  successMessage,
  whatsappMessage,
  turnstileSiteKey,
  children,
}: Props) {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    if (document.querySelector('script[data-turnstile]')) return;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.dataset['turnstile'] = 'true';
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  return (
    <form onSubmit={onSubmit} noValidate={false} className="relative flex flex-col gap-5">
      {children}
      <Honeypot />
      {turnstileSiteKey && (
        // Tema claro (combina com o site mesmo com o sistema em modo escuro) e
        // "interaction-only": a caixa só aparece se o Cloudflare pedir uma verificação.
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-language="pt-BR"
          data-theme="light"
          data-appearance="interaction-only"
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : submitLabel}
        </Button>
        <a
          href={whatsappLink(whatsappMessage)}
          className="text-azul font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefiro falar pelo WhatsApp<span className="sr-only">, abre em nova aba</span>
        </a>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status === 'success' && (
          <p className="rounded-xl bg-green-50 p-4 font-semibold text-green-900">
            {successMessage}
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-xl bg-red-50 p-4 font-semibold text-red-900">{error}</p>
        )}
      </div>
    </form>
  );
}
