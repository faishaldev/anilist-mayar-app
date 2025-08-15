import type { Anime } from '@/types';
import { Award, Clock, Play, Users } from 'lucide-react';
import {
  getAnimeScore,
  getAnimePopularity,
  getAnimeEpisodes,
  getAnimeDuration,
} from '@/lib/animeUtils';
import { statCardBase } from '@/lib/styleUtils';

interface AnimeModalStatsProps {
  anime: Anime;
}

export function AnimeModalStats({ anime }: AnimeModalStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className={statCardBase}>
        <Award className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
        <div className="text-sm font-medium">{getAnimeScore(anime)}/10</div>
        <div className="text-xs text-muted-foreground">Score</div>
      </div>
      <div className={statCardBase}>
        <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
        <div className="text-sm font-medium">{getAnimePopularity(anime)}</div>
        <div className="text-xs text-muted-foreground">Popularity</div>
      </div>
      <div className={statCardBase}>
        <Play className="w-5 h-5 mx-auto mb-1 text-green-600" />
        <div className="text-sm font-medium">{getAnimeEpisodes(anime)}</div>
        <div className="text-xs text-muted-foreground">Episodes</div>
      </div>
      <div className={statCardBase}>
        <Clock className="w-5 h-5 mx-auto mb-1 text-purple-600" />
        <div className="text-sm font-medium">{getAnimeDuration(anime)}m</div>
        <div className="text-xs text-muted-foreground">Duration</div>
      </div>
    </div>
  );
}
