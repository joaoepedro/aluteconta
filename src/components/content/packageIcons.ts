import type { Package } from '@/data/servicos';
import { BriefcaseIcon, PartyIcon, PresentationIcon } from '../ui/icons';

/** Ícone de cada pacote de cobertura */
export const PACKAGE_ICONS: Record<Package['id'], typeof BriefcaseIcon> = {
  corporativo: BriefcaseIcon,
  workshop: PresentationIcon,
  confraternizacao: PartyIcon,
};
