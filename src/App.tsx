import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_TRENDING_ANIME,
  GET_POPULAR_ANIME,
  GET_TOP_RATED_ANIME,
  GET_UPCOMING_ANIME,
  GET_RECENTLY_COMPLETED_ANIME,
  SEARCH_ANIME,
} from '@/lib/queries';
import { useLenis } from '@/hooks/useLenis';

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

interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

interface AnimeResponse {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}
import { SearchBar } from '@/components/SearchBar';
import { AnimeGrid } from '@/components/AnimeGrid';
import { AnimeModal } from '@/components/AnimeModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Star,
  Search,
  ArrowUp,
  Award,
  Calendar,
  Clock,
} from 'lucide-react';

type ViewMode =
  | 'trending'
  | 'popular'
  | 'topRated'
  | 'upcoming'
  | 'recentlyCompleted'
  | 'search';

function App() {
  const { scrollTo, stop, start } = useLenis();

  const [viewMode, setViewMode] = useState<ViewMode>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const {
    data: trendingData,
    loading: trendingLoading,
    fetchMore: fetchMoreTrending,
  } = useQuery<AnimeResponse>(GET_TRENDING_ANIME, {
    variables: { page: 1, perPage: 20 },
    skip: viewMode !== 'trending',
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: popularData,
    loading: popularLoading,
    fetchMore: fetchMorePopular,
  } = useQuery<AnimeResponse>(GET_POPULAR_ANIME, {
    variables: { page: 1, perPage: 20 },
    skip: viewMode !== 'popular',
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: searchData,
    loading: searchLoading,
    fetchMore: fetchMoreSearch,
  } = useQuery<AnimeResponse>(SEARCH_ANIME, {
    variables: { search: searchQuery, page: 1, perPage: 20 },
    skip: viewMode !== 'search' || !searchQuery,
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: topRatedData,
    loading: topRatedLoading,
    fetchMore: fetchMoreTopRated,
  } = useQuery<AnimeResponse>(GET_TOP_RATED_ANIME, {
    variables: { page: 1, perPage: 20 },
    skip: viewMode !== 'topRated',
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: upcomingData,
    loading: upcomingLoading,
    fetchMore: fetchMoreUpcoming,
  } = useQuery<AnimeResponse>(GET_UPCOMING_ANIME, {
    variables: { page: 1, perPage: 20 },
    skip: viewMode !== 'upcoming',
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: recentlyCompletedData,
    loading: recentlyCompletedLoading,
    fetchMore: fetchMoreRecentlyCompleted,
  } = useQuery<AnimeResponse>(GET_RECENTLY_COMPLETED_ANIME, {
    variables: { page: 1, perPage: 20 },
    skip: viewMode !== 'recentlyCompleted',
    notifyOnNetworkStatusChange: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setViewMode('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setViewMode('trending');
  };

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const getCurrentData = useCallback(() => {
    switch (viewMode) {
      case 'trending':
        return {
          media: trendingData?.Page.media || [],
          pageInfo: trendingData?.Page.pageInfo,
          loading: trendingLoading,
        };
      case 'popular':
        return {
          media: popularData?.Page.media || [],
          pageInfo: popularData?.Page.pageInfo,
          loading: popularLoading,
        };
      case 'topRated':
        return {
          media: topRatedData?.Page.media || [],
          pageInfo: topRatedData?.Page.pageInfo,
          loading: topRatedLoading,
        };
      case 'upcoming':
        return {
          media: upcomingData?.Page.media || [],
          pageInfo: upcomingData?.Page.pageInfo,
          loading: upcomingLoading,
        };
      case 'recentlyCompleted':
        return {
          media: recentlyCompletedData?.Page.media || [],
          pageInfo: recentlyCompletedData?.Page.pageInfo,
          loading: recentlyCompletedLoading,
        };
      case 'search':
        return {
          media: searchData?.Page.media || [],
          pageInfo: searchData?.Page.pageInfo,
          loading: searchLoading,
        };
      default:
        return {
          media: [],
          pageInfo: undefined,
          loading: false,
        };
    }
  }, [
    viewMode,
    trendingData,
    popularData,
    topRatedData,
    upcomingData,
    recentlyCompletedData,
    searchData,
    trendingLoading,
    popularLoading,
    topRatedLoading,
    upcomingLoading,
    recentlyCompletedLoading,
    searchLoading,
  ]);

  const loadMore = useCallback(async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const currentData = getCurrentData();
      if (!currentData.pageInfo?.hasNextPage) return;

      const nextPage = currentData.pageInfo.currentPage + 1;

      switch (viewMode) {
        case 'trending':
          await fetchMoreTrending({
            variables: { page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
        case 'popular':
          await fetchMorePopular({
            variables: { page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
        case 'search':
          await fetchMoreSearch({
            variables: { search: searchQuery, page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
        case 'topRated':
          await fetchMoreTopRated({
            variables: { page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
        case 'upcoming':
          await fetchMoreUpcoming({
            variables: { page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
        case 'recentlyCompleted':
          await fetchMoreRecentlyCompleted({
            variables: { page: nextPage, perPage: 20 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                Page: {
                  ...fetchMoreResult.Page,
                  media: [...prev.Page.media, ...fetchMoreResult.Page.media],
                },
              };
            },
          });
          break;
      }
    } catch (error) {
      console.error('Error loading more anime:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [
    loadingMore,
    viewMode,
    searchQuery,
    fetchMoreTrending,
    fetchMorePopular,
    fetchMoreSearch,
    fetchMoreTopRated,
    fetchMoreUpcoming,
    fetchMoreRecentlyCompleted,
    getCurrentData,
  ]);

  const {
    media: currentAnimes,
    pageInfo: currentPageInfo,
    loading: currentLoading,
  } = getCurrentData();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        if (currentPageInfo?.hasNextPage && !loadingMore && !currentLoading) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPageInfo?.hasNextPage, loadingMore, currentLoading, loadMore]);

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.5 });
  };

  const getTitle = () => {
    switch (viewMode) {
      case 'trending':
        return 'Trending Anime';
      case 'popular':
        return 'Popular Anime';
      case 'topRated':
        return 'Top Rated Anime';
      case 'upcoming':
        return 'Upcoming Anime';
      case 'recentlyCompleted':
        return 'Recently Completed';
      case 'search':
        return `Search Results for "${searchQuery}"`;
      default:
        return 'Anime';
    }
  };

  const getIcon = () => {
    switch (viewMode) {
      case 'trending':
        return <TrendingUp className="w-6 h-6" />;
      case 'popular':
        return <Star className="w-6 h-6" />;
      case 'topRated':
        return <Award className="w-6 h-6" />;
      case 'upcoming':
        return <Calendar className="w-6 h-6" />;
      case 'recentlyCompleted':
        return <Clock className="w-6 h-6" />;
      case 'search':
        return <Search className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AniList Explorer
              </h1>
            </div>

            <div>
              <SearchBar
                onSearch={handleSearch}
                onClear={handleClearSearch}
                loading={searchLoading}
              />
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b bg-card/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={viewMode === 'trending' ? 'default' : 'ghost'}
              onClick={() => setViewMode('trending')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
            <Button
              variant={viewMode === 'popular' ? 'default' : 'ghost'}
              onClick={() => setViewMode('popular')}
              className="flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              Popular
            </Button>
            <Button
              variant={viewMode === 'topRated' ? 'default' : 'ghost'}
              onClick={() => setViewMode('topRated')}
              className="flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Top Rated
            </Button>
            <Button
              variant={viewMode === 'upcoming' ? 'default' : 'ghost'}
              onClick={() => setViewMode('upcoming')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Upcoming
            </Button>
            <Button
              variant={viewMode === 'recentlyCompleted' ? 'default' : 'ghost'}
              onClick={() => setViewMode('recentlyCompleted')}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Recently Completed
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {getIcon()}
              {getTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {viewMode === 'trending' &&
                'Discover the hottest anime trending right now'}
              {viewMode === 'popular' &&
                'Explore the most popular anime of all time'}
              {viewMode === 'search' && `Found ${currentAnimes.length} results`}
            </p>
          </CardContent>
        </Card>

        <AnimeGrid
          animes={currentAnimes}
          onAnimeClick={handleAnimeClick}
          loading={currentLoading}
          loadingMore={loadingMore}
        />
      </main>

      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLenisStop={stop}
        onLenisStart={start}
      />

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">Built with ❤️ for Mayar Technical Assessment</p>
            <p className="text-sm">Data provided by AniList GraphQL API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
