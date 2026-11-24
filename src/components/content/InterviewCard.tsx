import { Badge } from '../ui/Badge';
import { Card } from './Card';
import type { InterviewCardData } from './types';

export function InterviewCard({ item }: { item: InterviewCardData }) {
  return (
    <Card
      href={item.href}
      title={item.personName}
      image={item.image}
      aspect="portrait"
      kicker={
        <>
          <Badge>{item.category}</Badge>
          {item.series && <Badge tone="laranja">{item.series}</Badge>}
        </>
      }
      footer={<time dateTime={item.isoDate}>{item.dateLabel}</time>}
    >
      <p className="text-cinza text-sm font-medium">{item.personRole}</p>
      {item.quote ? (
        <blockquote className="text-noite border-laranja border-l-2 pl-3 italic">
          “{item.quote}”
        </blockquote>
      ) : (
        <p className="text-noite/80 line-clamp-3">{item.description}</p>
      )}
    </Card>
  );
}
