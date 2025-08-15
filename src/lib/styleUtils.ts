import { cn } from './utils';

export const gradientOverlay = cn(
  'absolute inset-0 bg-gradient-to-t from-black/60',
  'via-transparent to-transparent',
);

export const cardHoverAnimation = cn(
  'group cursor-pointer transition-all duration-300',
  'hover:scale-105 hover:shadow-lg',
);

export const imageHoverScale = cn(
  'transition-transform duration-300 group-hover:scale-110',
);

export const statusBadgeBase = cn(
  'capitalize font-semibold px-2 py-1 rounded-md',
);

export const statusBadgeColors = {
  default: cn(
    'bg-green-100 text-green-800',
    'dark:bg-green-900 dark:text-green-200',
  ),
  completed: cn(
    'bg-blue-100 text-blue-800',
    'dark:bg-blue-900 dark:text-blue-200',
  ),
  ongoing: cn(
    'bg-yellow-100 text-yellow-800',
    'dark:bg-yellow-900 dark:text-yellow-200',
  ),
  upcoming: cn(
    'bg-purple-100 text-purple-800',
    'dark:bg-purple-900 dark:text-purple-200',
  ),
};

export const genreColors = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
];

export function getGenreColor(index: number): string {
  return genreColors[index % genreColors.length];
}

export const statCardBase = cn('text-center p-3 bg-muted rounded-lg');

export function getStatusBadgeStyle(status: string): string {
  const baseClasses = statusBadgeBase;
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');

  switch (normalizedStatus) {
    case 'finished':
    case 'completed':
      return cn(baseClasses, statusBadgeColors.completed);
    case 'releasing':
    case 'ongoing':
      return cn(baseClasses, statusBadgeColors.ongoing);
    case 'notyetreleased':
    case 'upcoming':
      return cn(baseClasses, statusBadgeColors.upcoming);
    default:
      return cn(baseClasses, statusBadgeColors.default);
  }
}

export const modalSectionHeader = cn(
  'text-lg font-semibold mb-4 flex items-center gap-2',
);
