import { useEffect, useState, useCallback } from 'react';
import { X, Star, Calendar, Play, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import parse from 'html-react-parser';
interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
    native?: string;
  };
  description: string;
  coverImage: {
    large: string;
  };
  bannerImage?: string;
  genres: string[];
  averageScore: number;
  popularity?: number;
  duration?: number;
  startDate: {
    year: number;
  };
  studios: {
    nodes: { name: string }[];
  };
  episodes?: number;
  status?: string;
  format?: string;
  source?: string;
  season?: string;
  seasonYear?: number;
}

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      setShouldRender(true);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      onLenisStop?.();
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 200);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      onLenisStart?.();
    };
  }, [isOpen, handleClose, onLenisStop, onLenisStart]);

  if (!shouldRender || !anime) return null;

  const title = anime.title.english || anime.title.romaji || anime.title.native;
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : 'N/A';
  const year = anime.startDate?.year || 'TBA';
  const studio = anime.studios?.nodes?.[0]?.name || 'Unknown Studio';
  const cleanDescription = anime.description || 'No description available.';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      data-lenis-prevent
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <Card
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        data-lenis-prevent
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={anime.bannerImage || anime.coverImage.large}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-end gap-4">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="w-24 h-36 md:w-32 md:h-48 object-cover rounded-lg shadow-lg"
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

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Award className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
              <div className="text-sm font-medium">{score}/10</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">
                {anime.popularity?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">Popularity</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Play className="w-5 h-5 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">
                {anime.episodes || 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">Episodes</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-purple-600" />
              <div className="text-sm font-medium">
                {anime.duration || 'N/A'}m
              </div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
            <div className="text-muted-foreground leading-relaxed">
              {parse(cleanDescription)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Details
              </h3>
              <Card className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Studio:
                    </span>
                    <span className="font-semibold">{studio}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Status:
                    </span>
                    <span className="capitalize font-semibold px-2 py-1 rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {anime.status?.toLowerCase().replace('_', ' ')}
                    </span>
                  </div>
                  {anime.season && (
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">
                        Season:
                      </span>
                      <span className="font-semibold">
                        {anime.season} {anime.seasonYear}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Format:
                    </span>
                    <span className="font-semibold">
                      {anime.format || 'TV'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Source:
                    </span>
                    <span className="font-semibold">
                      {anime.source?.replace('_', ' ') || 'Original'}
                    </span>
                  </div>
                  {anime.startDate?.year && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground font-medium">
                        Year:
                      </span>
                      <span className="font-semibold">
                        {anime.startDate.year}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Genres
              </h3>
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map((genre, index) => (
                    <span
                      key={genre}
                      className={`px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transform transition-transform ${
                        index % 6 === 0
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : index % 6 === 1
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : index % 6 === 2
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : index % 6 === 3
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : index % 6 === 4
                          ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                      }`}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
