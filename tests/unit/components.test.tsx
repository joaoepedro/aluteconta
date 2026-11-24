import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonLink } from '@/components/ui/Button';
import { InterviewCard } from '@/components/content/InterviewCard';
import { PricingTable } from '@/components/content/PricingTable';

const image = {
  src: '/x.webp',
  srcSet: '/x.webp 360w',
  sizes: '100vw',
  width: 360,
  height: 450,
  alt: 'Foto',
};

describe('componentes', () => {
  it('link externo abre em nova aba e avisa leitores de tela', () => {
    render(<ButtonLink href="https://instagram.com">Instagram</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Instagram, abre em nova aba' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('card de entrevista tem um único link, com o nome da pessoa', () => {
    render(
      <InterviewCard
        item={{
          href: '/entrevistas/teste',
          title: 'Título',
          description: 'Resumo',
          image,
          personName: 'Maria',
          personRole: 'Confeiteira',
          category: 'Empreendedores e empresas',
          dateLabel: '1 de janeiro de 2027',
          isoDate: '2027-01-01',
          quote: 'Frase',
        }}
      />,
    );
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Maria' })).toHaveAttribute(
      'href',
      '/entrevistas/teste',
    );
  });

  it('pacotes escondem valores quando showPrices é falso', () => {
    const { rerender } = render(<PricingTable showPrices />);
    expect(screen.getAllByText(/R\$/).length).toBeGreaterThan(0);
    rerender(<PricingTable showPrices={false} />);
    expect(screen.queryAllByText(/R\$/)).toHaveLength(0);
  });
});
