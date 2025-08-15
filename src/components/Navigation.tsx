import { Award, Calendar, Clock, Star, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import type { ViewMode } from '@/types/viewMode';

interface NavigationProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function Navigation({ viewMode, onViewModeChange }: NavigationProps) {
  return (
    <nav className="border-b bg-card/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={viewMode === 'trending' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('trending')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </Button>
          <Button
            variant={viewMode === 'popular' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('popular')}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Popular
          </Button>
          <Button
            variant={viewMode === 'topRated' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('topRated')}
            className="flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            Top Rated
          </Button>
          <Button
            variant={viewMode === 'upcoming' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('upcoming')}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Upcoming
          </Button>
          <Button
            variant={viewMode === 'recentlyCompleted' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('recentlyCompleted')}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Recently Completed
          </Button>
        </div>
      </div>
    </nav>
  );
}
