import { useState, type SubmitEvent } from 'react';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/** Lê o formulário, junta checkboxes repetidos em lista e envia para /api/contato */
export function useFormSubmit(formName: 'orcamento' | 'cafe-conexao') {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: Record<string, unknown> = { form: formName };
    for (const key of new Set(data.keys())) {
      const values = data.getAll(key).map(String);
      payload[key] = key === 'addons' ? values : values[0];
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? 'Não foi possível enviar agora.');
      setStatus('success');
      form.reset();
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Não foi possível enviar agora.');
    }
  }

  return { status, error, onSubmit };
}
