import { useAnimeModalLogic } from '@/hooks/useAnimeModalLogic';
import type { Anime } from '@/types';
import { AnimeModalOverlay } from './AnimeModalOverlay';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { AnimeModalHeader } from './AnimeModalHeader';
import { AnimeModalStats } from './AnimeModalStats';
import { AnimeModalSynopsis } from './AnimeModalSynopsis';
import { AnimeModalDetails } from './AnimeModalDetails';
import { AnimeModalGenres } from './AnimeModalGenres';

interface AnimeModalProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
  onLenisStop?: () => void;
  onLenisStart?: () => void;
}

export function AnimeModal({
  anime,
  isOpen,
  onClose,
  onLenisStop,
  onLenisStart,
}: AnimeModalProps) {
  const { isAnimating, shouldRender } = useAnimeModalLogic({
    isOpen,
    onClose,
    onLenisStop,
    onLenisStart,
  });

  if (!shouldRender || !anime) return null;

  return (
    <AnimeModalOverlay isAnimating={isAnimating} onClose={onClose}>
      <Card
        className={cn(
          `relative
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          transition-all
          duration-300
          transform ${
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4'
          }`,
        )}
        data-lenis-prevent
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={cn(
            `absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm`,
          )}
        >
          <X className="w-4 h-4" />
        </Button>
        <AnimeModalHeader anime={anime} />
        <CardContent className="p-6">
          <AnimeModalStats anime={anime} />
          <AnimeModalSynopsis anime={anime} />
          <div className="grid md:grid-cols-2 gap-8">
            <AnimeModalDetails anime={anime} />
            <AnimeModalGenres anime={anime} />
          </div>
        </CardContent>
      </Card>
    </AnimeModalOverlay>
  );
}
