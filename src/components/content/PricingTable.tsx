import { ADDONS, INCLUDED, PACKAGES, formatBRL } from '@/data/servicos';
import { ButtonLink } from '../ui/Button';
import { CheckIcon } from '../ui/icons';
import { PACKAGE_ICONS } from './packageIcons';

/** Pacotes de cobertura + adicionais. Dados em src/data/servicos.ts */
export function PricingTable({ showPrices }: { showPrices: boolean }) {
  return (
    <div className="space-y-10">
      <ul className="grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((pkg) => {
          const Icon = PACKAGE_ICONS[pkg.id];
          return (
            <li
              key={pkg.id}
              className="border-borda bg-branco hover:border-laranja group flex flex-col rounded-2xl border-2 p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="bg-azul text-branco group-hover:bg-laranja group-hover:text-noite mb-4 inline-flex size-14 items-center justify-center rounded-2xl transition-colors">
                <Icon className="size-7" />
              </span>
              <h3 className="text-xl">{pkg.name}</h3>
              <p className="text-cinza mt-2">{pkg.purpose}</p>
              <p className="text-noite mt-4 font-semibold">{pkg.duration}</p>
              {showPrices && (
                <p className="mt-2">
                  <span className="text-cinza text-sm">a partir de </span>
                  <span className="font-display text-azul text-3xl font-bold">
                    {formatBRL(pkg.price)}
                  </span>
                </p>
              )}
              <ButtonLink
                href={`/para-marcas?pacote=${pkg.id}#orcamento`}
                variant="accent"
                className="mt-6"
                aria-label={`Pedir orçamento: ${pkg.name}`}
              >
                Pedir orçamento
              </ButtonLink>
            </li>
          );
        })}
      </ul>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xl">Incluído na cobertura</h3>
          <ul className="space-y-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="bg-laranja text-noite inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xl">Adicionais</h3>
          <table className="w-full text-left">
            <caption className="sr-only">Serviços adicionais e valores</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Serviço</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-borda divide-y">
              {ADDONS.map((addon) => (
                <tr key={addon.name}>
                  <th scope="row" className="py-2 font-medium">
                    {addon.name}
                  </th>
                  <td className="py-2 text-right">
                    {addon.note ??
                      (showPrices && addon.price
                        ? `${formatBRL(addon.price)}${addon.unit ? ` ${addon.unit}` : ''}`
                        : 'Sob consulta')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
