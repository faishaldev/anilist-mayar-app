import { AnimeCard } from './AnimeCard';

interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    large: string;
  };
  genres: string[];
  averageScore: number;
  startDate: {
    year: number;
  };
  studios: {
    nodes: { name: string }[];
  };
}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4" />
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded" />
              <div className="bg-muted h-3 rounded w-3/4" />
              <div className="bg-muted h-3 rounded w-1/2" />
            </div>
          </div>
        ))}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onClick={() => onAnimeClick?.(anime)}
        />
      ))}
      {loadingMore &&
        Array.from({ length: 5 }).map((_, index) => (
          <div key={`loading-${index}`} className="animate-pulse">
            <div className="bg-muted rounded-lg h-64 mb-4" />
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded" />
              <div className="bg-muted h-3 rounded w-3/4" />
              <div className="bg-muted h-3 rounded w-1/2" />
            </div>
          </div>
        ))}
    </div>
  );
}
