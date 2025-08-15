import { gradientOverlay, imageHoverScale } from '@/lib/styleUtils';
import { cn } from '@/lib/utils';
import type { Anime } from '@/types';
import { Play, Star } from 'lucide-react';

interface AnimeCardImageProps {
  anime: Anime;
  title: string;
  score: string;
}

export function AnimeCardImage({ anime, title, score }: AnimeCardImageProps) {
  return (
    <div className="relative overflow-hidden">
      <img
        src={anime.coverImage.large}
        alt={title}
        className={`w-full h-64 object-cover ${imageHoverScale}`}
        loading="lazy"
      />
      <div className={gradientOverlay} />
      <div
        className={cn(
          `absolute top-2 left-2 right-2 flex justify-between items-start`,
        )}
      >
        {anime.episodes && (
          <div
            className={cn(
              `bg-blue-600/80
              text-white
              px-2
              py-1
              rounded-full
              text-xs
              font-medium
              flex
              items-center
              gap-1`,
            )}
          >
            <Play className="w-3 h-3" />
            {anime.episodes} eps
          </div>
        )}
        <div
          className={cn(
            `bg-black/70
            text-white
            px-2
            py-1
            rounded-full
            text-xs
            font-medium
            flex
            items-center
            gap-1`,
          )}
        >
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {score}
        </div>
      </div>
    </div>
  );
}
