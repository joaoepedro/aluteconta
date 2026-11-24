import { Select, TextArea, TextField } from './fields';
import { FormShell } from './FormShell';
import { useFormSubmit } from './useFormSubmit';

type Props = {
  turnstileSiteKey?: string | undefined;
  /** Edição pré-selecionada (página de uma edição) */
  edition?: string | undefined;
};

/** Interesse no Café Conexão. Usar com client:visible. */
export function CafeConexaoForm({ turnstileSiteKey, edition }: Props) {
  const { status, error, onSubmit } = useFormSubmit('cafe-conexao');

  return (
    <FormShell
      status={status}
      error={error}
      onSubmit={onSubmit}
      submitLabel="Enviar"
      successMessage="Recebemos seu contato! A equipe do Café Conexão vai falar com você em breve."
      whatsappMessage="Olá, Lú! Quero saber mais sobre o Café Conexão."
      turnstileSiteKey={turnstileSiteKey}
    >
      {edition && <input type="hidden" name="edition" value={edition} />}
      <Select
        label="Como você quer participar?"
        name="interest"
        defaultValue="participar"
        options={[
          { value: 'participar', label: 'Quero participar do encontro' },
          { value: 'expor', label: 'Quero expor minha marca' },
          { value: 'palestrar', label: 'Quero ser convidado(a) para falar' },
          { value: 'patrocinar', label: 'Quero patrocinar ou apoiar' },
        ]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Seu nome" name="name" required autoComplete="name" />
        <TextField
          label="Empresa ou profissão (opcional)"
          name="company"
          autoComplete="organization"
        />
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
      <TextArea label="Mensagem (opcional)" name="message" />
    </FormShell>
  );
}
