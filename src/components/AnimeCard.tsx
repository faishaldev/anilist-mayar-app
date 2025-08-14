import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star, Calendar, Play } from 'lucide-react';

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
  episodes?: number;
}

interface AnimeCardProps {
  anime: Anime;
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : 'N/A';
  const year = anime.startDate?.year || 'TBA';
  const studio = anime.studios?.nodes?.[0]?.name || 'Unknown Studio';

  // Parse and truncate description
  const parseHtmlToText = (html: string) => {
    if (!html) return 'No description available.';

    // Create a temporary div to extract text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const parsedDescription = parseHtmlToText(anime.description);
  const cleanDescription =
    parsedDescription.substring(0, 120) +
    (parsedDescription.length > 120 ? '...' : '');

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden h-[500px] flex flex-col"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={anime.coverImage.large}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          {anime.episodes && (
            <div className="bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Play className="w-3 h-3" />
              {anime.episodes} eps
            </div>
          )}
          <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {score}
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
          <span className="truncate">{studio}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex flex-col flex-1">
        <div className="flex-1 flex flex-col">
          <CardDescription className="line-clamp-3 text-justify leading-relaxed mb-4">
            {cleanDescription}
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-1 justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {anime.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          {anime.genres?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
