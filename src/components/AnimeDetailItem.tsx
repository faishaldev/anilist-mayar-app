import { cn } from '@/lib/utils';

interface AnimeDetailItemProps {
  label: string;
  value: string | React.ReactNode;
  isLast?: boolean;
}

export function AnimeDetailItem({
  label,
  value,
  isLast = false,
}: AnimeDetailItemProps) {
  return (
    <div
      className={cn(
        `flex
        justify-between
        items-center
        py-2`,
        !isLast && 'border-b border-border/50',
      )}
    >
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
