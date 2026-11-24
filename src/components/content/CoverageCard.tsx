import { Badge } from '../ui/Badge';
import { Card } from './Card';
import type { CoverageCardData } from './types';

export function CoverageCard({ item }: { item: CoverageCardData }) {
  return (
    <Card
      href={item.href}
      title={item.title}
      image={item.image}
      kicker={<Badge>{item.eventType}</Badge>}
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
