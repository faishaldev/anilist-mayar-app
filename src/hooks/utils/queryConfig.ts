import {
  GET_POPULAR_ANIME,
  GET_RECENTLY_COMPLETED_ANIME,
  GET_TOP_RATED_ANIME,
  GET_TRENDING_ANIME,
  GET_UPCOMING_ANIME,
  SEARCH_ANIME,
} from '@/lib/queries';
import type { ViewMode } from '@/types/viewMode';

export const QUERY_CONFIG = {
  trending: {
    query: GET_TRENDING_ANIME,
    variables: { page: 1, perPage: 20 },
  },
  popular: {
    query: GET_POPULAR_ANIME,
    variables: { page: 1, perPage: 20 },
  },
  topRated: {
    query: GET_TOP_RATED_ANIME,
    variables: { page: 1, perPage: 20 },
  },
  upcoming: {
    query: GET_UPCOMING_ANIME,
    variables: { page: 1, perPage: 20 },
  },
  recentlyCompleted: {
    query: GET_RECENTLY_COMPLETED_ANIME,
    variables: { page: 1, perPage: 20 },
  },
  search: {
    query: SEARCH_ANIME,
    variables: { page: 1, perPage: 20 },
  },
} as const;

export const getQueryConfig = (viewMode: ViewMode, searchQuery?: string) => {
  const config = QUERY_CONFIG[viewMode];
  if (viewMode === 'search' && searchQuery) {
    return {
      ...config,
      variables: { ...config.variables, search: searchQuery },
    };
  }
  return config;
};
