import { cn, truncateDescription } from '@/lib/utils';
import {
  getAnimeTitle,
  getAnimeScore,
  getAnimeYear,
  getAnimeStudio,
} from '@/lib/animeUtils';
import { cardHoverAnimation } from '@/lib/styleUtils';
import type { Anime } from '@/types';
import { Card } from './ui/card';
import { AnimeCardImage } from './AnimeCardImage';
import { AnimeCardContent } from './AnimeCardContent';

interface AnimeCardProps {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const title = getAnimeTitle(anime);
  const score = getAnimeScore(anime);
  const year = getAnimeYear(anime);
  const studio = getAnimeStudio(anime);
  const cleanDescription = truncateDescription(anime.description);

  return (
    <Card
      className={cn(
        `${cardHoverAnimation} overflow-hidden h-[500px] flex flex-col`,
      )}
      onClick={onClick}
    >
      <AnimeCardImage anime={anime} title={title} score={score} />
      <AnimeCardContent
        anime={anime}
        title={title}
        year={year}
        studio={studio}
        cleanDescription={cleanDescription}
      />
    </Card>
  );
}
