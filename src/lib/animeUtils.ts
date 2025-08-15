import type { Anime } from '@/types';

export function getAnimeTitle(anime: Anime): string {
  return (
    anime.title.english ||
    anime.title.romaji ||
    anime.title.native ||
    'Unknown Title'
  );
}

export function getAnimeScore(anime: Anime): string {
  return anime.averageScore ? (anime.averageScore / 10).toFixed(1) : 'N/A';
}

export function getAnimeYear(anime: Anime): string | number {
  return anime.startDate?.year || 'TBA';
}

export function getAnimeStudio(anime: Anime): string {
  return anime.studios?.nodes?.[0]?.name || 'Unknown Studio';
}

export function getAnimeSeason(anime: Anime): string | null {
  if (!anime.season) return null;
  return `${anime.season} ${anime.seasonYear || ''}`;
}

export function getAnimePopularity(anime: Anime): string {
  return anime.popularity?.toLocaleString() || 'N/A';
}

export function getAnimeEpisodes(anime: Anime): string {
  return anime.episodes?.toString() || 'N/A';
}

export function getAnimeDuration(anime: Anime): string {
  return anime.duration ? `${anime.duration}m` : 'N/A';
}

export function getAnimeSource(anime: Anime): string {
  return anime.source?.replace('_', ' ') || 'Original';
}

export function getAnimeStatus(anime: Anime): string {
  return anime.status?.toLowerCase().replace('_', ' ') || 'Unknown';
}
