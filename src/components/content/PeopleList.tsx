import type { ResponsiveImage } from '@/lib/images';
import { Img } from '../ui/Img';

export type Person = {
  name: string;
  role: string;
  topic?: string | undefined;
  url?: string | undefined;
  photo?: ResponsiveImage | undefined;
};

/** Convidados especialistas de uma edição do Café Conexão */
export function GuestList({ people }: { people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <section aria-labelledby="convidados" className="mt-12">
      <h2 id="convidados" className="mb-5 text-2xl">
        Convidados especiais
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {people.map((p) => (
          <li key={p.name} className="border-borda flex gap-4 rounded-2xl border p-4">
            {p.photo && (
              <div className="size-16 shrink-0 overflow-hidden rounded-full">
                <Img image={p.photo} />
              </div>
            )}
            <div>
              <p className="font-display text-noite font-bold">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </p>
              <p className="text-cinza text-sm">{p.role}</p>
              {p.topic && <p className="text-noite mt-1 text-sm">Tema: {p.topic}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type Participant = {
  name: string;
  roleLabel: string;
  href?: string | undefined;
  instagram?: string | undefined;
  whatsapp?: string | undefined;
};

/** Participantes, expositores, patrocinadores e apoiadores, agrupados por papel */
export function ParticipantList({ groups }: { groups: { label: string; items: Participant[] }[] }) {
  const visible = groups.filter((g) => g.items.length > 0);
  if (visible.length === 0) return null;
  return (
    <section aria-labelledby="participantes" className="mt-12">
      <h2 id="participantes" className="mb-5 text-2xl">
        Quem fez parte
      </h2>
      <div className="space-y-6">
        {visible.map((group) => (
          <div key={group.label}>
            <h3 className="text-laranja-texto mb-3 text-sm font-semibold tracking-wide uppercase">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((p) => (
                <li key={p.name} className="bg-creme rounded-full px-4 py-2 text-sm">
                  {p.href ? (
                    <a href={p.href} className="text-azul font-semibold underline">
                      {p.name}
                    </a>
                  ) : (
                    <span className="text-noite font-semibold">{p.name}</span>
                  )}
                  {p.instagram && (
                    <a
                      href={p.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cinza ml-2 underline"
                      aria-label={`Instagram de ${p.name}, abre em nova aba`}
                    >
                      Instagram
                    </a>
                  )}
                  {p.whatsapp && (
                    <a
                      href={`https://wa.me/${p.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cinza ml-2 underline"
                      aria-label={`WhatsApp de ${p.name}, abre em nova aba`}
                    >
                      WhatsApp
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
