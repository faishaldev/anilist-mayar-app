import type { Anime } from '@/types';
import { AnimeCard } from './AnimeCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { cn } from '@/lib/utils';

interface AnimeGridProps {
  animes: Anime[];
  onAnimeClick?: (anime: Anime) => void;
  loading?: boolean;
  loadingMore?: boolean;
}

export function AnimeGrid({
  animes,
  onAnimeClick,
  loading,
  loadingMore,
}: AnimeGridProps) {
  if (loading && animes.length === 0) {
    return (
      <div
        className={cn(
          `grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6`,
        )}
      >
        <LoadingSkeleton count={10} />
      </div>
    );
  }

  if (animes.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No anime found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-6`,
      )}
    >
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onClick={() => onAnimeClick?.(anime)}
        />
      ))}
      {loadingMore && <LoadingSkeleton count={5} />}
    </div>
  );
}
