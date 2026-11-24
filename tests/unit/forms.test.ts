import { describe, expect, it } from 'vitest';
import { buildEmail, formSchema } from '@/lib/forms';

const valid = {
  form: 'orcamento',
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  phone: '(16) 99999-9999',
  package: 'corporativo',
  addons: ['Reel editado'],
  website: '',
};

describe('formulários', () => {
  it('aceita um pedido de orçamento válido', () => {
    expect(formSchema.safeParse(valid).success).toBe(true);
  });

  it('recusa e-mail inválido com mensagem em português', () => {
    const r = formSchema.safeParse({ ...valid, email: 'maria' });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.message).toBe('E-mail inválido');
  });

  it('recusa quando o campo-isca vem preenchido (robô)', () => {
    expect(formSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false);
  });

  it('monta e-mail legível para a Lú', () => {
    const parsed = formSchema.parse(valid);
    const { subject, text } = buildEmail(parsed);
    expect(subject).toBe('Pedido de orçamento: Evento corporativo — Maria Silva');
    expect(text).toContain('Adicionais: Reel editado');
    expect(text).not.toContain('Mensagem:');
  });

  it('valida o formulário do Café Conexão', () => {
    const r = formSchema.safeParse({
      form: 'cafe-conexao',
      name: 'João',
      email: 'joao@ex.com',
      interest: 'expor',
    });
    expect(r.success).toBe(true);
  });
});
