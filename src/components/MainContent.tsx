import type { Anime } from '@/types';
import type { ViewMode } from '@/types/viewMode';
import { getViewModeInfo } from './ViewModeConfig';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AnimeGrid } from './AnimeGrid';

interface MainContentProps {
  viewMode: ViewMode;
  currentAnimes: Anime[];
  currentLoading: boolean;
  loadingMore: boolean;
  onAnimeClick: (anime: Anime) => void;
}

export function MainContent({
  viewMode,
  currentAnimes,
  currentLoading,
  loadingMore,
  onAnimeClick,
}: MainContentProps) {
  const { icon, title, description } = getViewModeInfo(
    viewMode,
    currentAnimes.length,
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
      <AnimeGrid
        animes={currentAnimes}
        onAnimeClick={onAnimeClick}
        loading={currentLoading}
        loadingMore={loadingMore}
      />
    </main>
  );
}
