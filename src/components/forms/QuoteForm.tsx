import { useEffect, useRef } from 'react';
import { ADDONS, PACKAGES } from '@/data/servicos';
import { CheckboxGroup, Select, TextArea, TextField } from './fields';
import { FormShell } from './FormShell';
import { useFormSubmit } from './useFormSubmit';

/** Pedido de orçamento de cobertura. Usar com client:visible. */
export function QuoteForm({ turnstileSiteKey }: { turnstileSiteKey?: string | undefined }) {
  const { status, error, onSubmit } = useFormSubmit('orcamento');
  const packageRef = useRef<HTMLSelectElement>(null);

  // Pré-seleciona o pacote vindo de /para-marcas?pacote=...
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('pacote');
    if (fromUrl && packageRef.current && PACKAGES.some((p) => p.id === fromUrl)) {
      packageRef.current.value = fromUrl;
    }
  }, []);

  return (
    <FormShell
      status={status}
      error={error}
      onSubmit={onSubmit}
      submitLabel="Enviar pedido de orçamento"
      successMessage="Pedido enviado! A Lú responde em até 2 dias úteis."
      whatsappMessage="Olá, Lú! Quero um orçamento de cobertura para meu evento."
      turnstileSiteKey={turnstileSiteKey}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Seu nome" name="name" required autoComplete="name" />
        <TextField label="Empresa (opcional)" name="company" autoComplete="organization" />
        <TextField label="E-mail" name="email" type="email" required autoComplete="email" />
        <TextField
          label="WhatsApp"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          hint="Com DDD"
        />
      </div>
      <Select
        label="Tipo de evento"
        name="package"
        ref={packageRef}
        defaultValue="corporativo"
        options={[
          ...PACKAGES.map((p) => ({ value: p.id, label: p.name })),
          { value: 'outro', label: 'Outro' },
        ]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Data do evento" name="eventDate" type="date" />
        <TextField label="Cidade e local" name="eventCity" placeholder="Ex.: Franca, Espaço X" />
      </div>
      <CheckboxGroup
        legend="Adicionais de interesse"
        name="addons"
        options={ADDONS.filter((a) => a.price).map((a) => a.name)}
      />
      <TextArea label="Conte um pouco sobre o evento" name="message" />
    </FormShell>
  );
}
