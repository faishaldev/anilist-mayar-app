import type { Anime } from '@/types';
import { Clock } from 'lucide-react';
import { Card } from './ui/card';
import { AnimeDetailItem } from './AnimeDetailItem';
import {
  getAnimeStudio,
  getAnimeSeason,
  getAnimeYear,
  getAnimeSource,
  getAnimeStatus,
} from '@/lib/animeUtils';
import { modalSectionHeader, getStatusBadgeStyle } from '@/lib/styleUtils';

interface AnimeModalDetailsProps {
  anime: Anime;
}

export function AnimeModalDetails({ anime }: AnimeModalDetailsProps) {
  return (
    <div>
      <h3 className={modalSectionHeader}>
        <Clock className="w-5 h-5" />
        Details
      </h3>
      <Card className="p-4">
        <div className="space-y-3 text-sm">
          <AnimeDetailItem label="Studio" value={getAnimeStudio(anime)} />
          <AnimeDetailItem
            label="Status"
            value={
              <span className={getStatusBadgeStyle(getAnimeStatus(anime))}>
                {getAnimeStatus(anime)}
              </span>
            }
          />
          {anime.season && (
            <AnimeDetailItem label="Season" value={getAnimeSeason(anime)} />
          )}
          <AnimeDetailItem label="Format" value={anime.format || 'TV'} />
          <AnimeDetailItem label="Source" value={getAnimeSource(anime)} />
          {anime.startDate?.year && (
            <AnimeDetailItem
              label="Year"
              value={getAnimeYear(anime)}
              isLast={true}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
