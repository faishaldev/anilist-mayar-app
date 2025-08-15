import { Award, Calendar, Clock, Star, TrendingUp } from 'lucide-react';
import type { ViewMode } from '@/types/viewMode';

interface ViewModeInfo {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export function getViewModeInfo(
  viewMode: ViewMode,
  resultsCount?: number,
): ViewModeInfo {
  const configs: Record<ViewMode, ViewModeInfo> = {
    trending: {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Trending Anime',
      description: 'Discover the hottest anime trending right now',
    },
    popular: {
      icon: <Star className="w-6 h-6" />,
      title: 'Popular Anime',
      description: 'Explore the most popular anime of all time',
    },
    topRated: {
      icon: <Award className="w-6 h-6" />,
      title: 'Top Rated Anime',
      description: '',
    },
    upcoming: {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Upcoming Anime',
      description: '',
    },
    recentlyCompleted: {
      icon: <Clock className="w-6 h-6" />,
      title: 'Recently Completed',
      description: '',
    },
    search: {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Search Results',
      description: `Found ${resultsCount || 0} results`,
    },
  };

  return configs[viewMode] || configs.trending;
}
