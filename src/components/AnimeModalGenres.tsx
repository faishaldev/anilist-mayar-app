import type { Anime } from '@/types';
import { Award } from 'lucide-react';
import { Card } from './ui/card';
import { getGenreColor, modalSectionHeader } from '@/lib/styleUtils';
import { cn } from '@/lib/utils';

interface AnimeModalGenresProps {
  anime: Anime;
}

export function AnimeModalGenres({ anime }: AnimeModalGenresProps) {
  return (
    <div>
      <h3 className={modalSectionHeader}>
        <Award className="w-5 h-5" />
        Genres
      </h3>
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {anime.genres?.map((genre, index) => (
            <span
              key={genre}
              className={cn(
                `px-3
                py-2
                rounded-lg
                text-sm
                font-medium
                hover:scale-105
                transform
                transition-transform
                ${getGenreColor(index)}`,
              )}
            >
              {genre}
            </span>
          ))}
        </div>
        {(!anime.genres || anime.genres.length === 0) && (
          <p className="text-muted-foreground text-sm italic">
            No genres available
          </p>
        )}
      </Card>
    </div>
  );
}
