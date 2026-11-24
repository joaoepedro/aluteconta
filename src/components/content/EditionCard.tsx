import { Badge } from '../ui/Badge';
import { Card } from './Card';
import type { EditionCardData } from './types';

export function EditionCard({ item }: { item: EditionCardData }) {
  return (
    <Card
      href={item.href}
      title={item.title}
      image={item.image}
      kicker={
        <>
          <Badge tone="laranja">{item.upcoming ? 'Próxima edição' : 'Edição realizada'}</Badge>
          <Badge tone="creme">{item.theme}</Badge>
        </>
      }
      footer={
        <>
          <time dateTime={item.isoDate}>{item.dateLabel}</time> · {item.location}
        </>
      }
    >
      <p className="text-noite/80 line-clamp-3">{item.description}</p>
    </Card>
  );
}
