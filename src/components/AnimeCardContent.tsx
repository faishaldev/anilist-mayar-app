import type { Anime } from '@/types';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimeCardContentProps {
  anime: Anime;
  title: string;
  year: string | number;
  studio: string;
  cleanDescription: string;
}

export function AnimeCardContent({
  anime,
  title,
  year,
  studio,
  cleanDescription,
}: AnimeCardContentProps) {
  return (
    <>
      <CardHeader className="pb-4">
        <CardTitle
          className={cn(
            `text-lg
            line-clamp-1
            group-hover:text-blue-600
            transition-colors`,
          )}
        >
          {title}
        </CardTitle>
        <div
          className={cn(
            `flex items-center justify-between text-sm text-muted-foreground`,
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
          <span className="truncate">{studio}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex flex-col flex-1">
        <div className="flex-1 flex flex-col">
          <CardDescription
            className={cn(`line-clamp-3 text-justify leading-relaxed mb-4`)}
          >
            {cleanDescription}
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-1 justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {anime.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className={cn(
                  `px-2
                  py-1
                  bg-secondary
                  text-secondary-foreground
                  rounded-full
                  text-xs
                  font-medium`,
                )}
              >
                {genre}
              </span>
            ))}
          </div>
          {anime.genres?.length > 2 && (
            <span
              className={cn(
                `px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs`,
              )}
            >
              +{anime.genres.length - 2}
            </span>
          )}
        </div>
      </CardContent>
    </>
  );
}
