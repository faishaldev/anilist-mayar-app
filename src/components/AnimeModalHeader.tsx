import type { Anime } from '@/types';
import { Calendar, Play, Star } from 'lucide-react';
import { getAnimeTitle, getAnimeScore, getAnimeYear } from '@/lib/animeUtils';
import { gradientOverlay } from '@/lib/styleUtils';
import { cn } from '@/lib/utils';

interface AnimeModalHeaderProps {
  anime: Anime;
}

export function AnimeModalHeader({ anime }: AnimeModalHeaderProps) {
  const title = getAnimeTitle(anime);
  const score = getAnimeScore(anime);
  const year = getAnimeYear(anime);

  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img
        src={anime.bannerImage || anime.coverImage.large}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className={gradientOverlay} />

      <div className="absolute bottom-4 left-4 flex items-end gap-4">
        <img
          src={anime.coverImage.large}
          alt={title}
          className={cn(
            `w-24 h-36 md:w-32 md:h-48 object-cover rounded-lg shadow-lg`,
          )}
        />
        <div className="text-white mb-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{year}</span>
            </div>
            {anime.episodes && (
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>{anime.episodes} episodes</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
