export function SkipLink({ target = 'conteudo' }: { target?: string }) {
  return (
    <a
      href={`#${target}`}
      className="bg-laranja text-noite sr-only z-50 rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Pular para o conteúdo
    </a>
  );
}
