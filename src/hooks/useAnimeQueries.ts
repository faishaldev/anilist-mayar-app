import { useQuery } from '@apollo/client';
import type { ViewMode } from '@/types/viewMode';
import type { AnimeResponse } from '@/types';
import { QUERY_CONFIG } from './utils/queryConfig';

export const useAnimeQueries = (viewMode: ViewMode, searchQuery: string) => {
  const trendingQuery = useQuery<AnimeResponse>(QUERY_CONFIG.trending.query, {
    variables: QUERY_CONFIG.trending.variables,
    skip: viewMode !== 'trending',
    notifyOnNetworkStatusChange: true,
  });

  const popularQuery = useQuery<AnimeResponse>(QUERY_CONFIG.popular.query, {
    variables: QUERY_CONFIG.popular.variables,
    skip: viewMode !== 'popular',
    notifyOnNetworkStatusChange: true,
  });

  const topRatedQuery = useQuery<AnimeResponse>(QUERY_CONFIG.topRated.query, {
    variables: QUERY_CONFIG.topRated.variables,
    skip: viewMode !== 'topRated',
    notifyOnNetworkStatusChange: true,
  });

  const upcomingQuery = useQuery<AnimeResponse>(QUERY_CONFIG.upcoming.query, {
    variables: QUERY_CONFIG.upcoming.variables,
    skip: viewMode !== 'upcoming',
    notifyOnNetworkStatusChange: true,
  });

  const recentlyCompletedQuery = useQuery<AnimeResponse>(
    QUERY_CONFIG.recentlyCompleted.query,
    {
      variables: QUERY_CONFIG.recentlyCompleted.variables,
      skip: viewMode !== 'recentlyCompleted',
      notifyOnNetworkStatusChange: true,
    },
  );

  const searchQuery_ = useQuery<AnimeResponse>(QUERY_CONFIG.search.query, {
    variables: { ...QUERY_CONFIG.search.variables, search: searchQuery },
    skip: viewMode !== 'search' || !searchQuery,
    notifyOnNetworkStatusChange: true,
  });

  return {
    trending: trendingQuery,
    popular: popularQuery,
    topRated: topRatedQuery,
    upcoming: upcomingQuery,
    recentlyCompleted: recentlyCompletedQuery,
    search: searchQuery_,
  };
};
