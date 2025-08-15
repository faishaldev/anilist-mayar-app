import type { AnimeResponse } from '@/types';
import type { ViewMode } from '@/types/viewMode';
import { useInfiniteScrollDetection } from '@/lib/scrollUtils';

export const createUpdateQuery = () => {
  return (
    previousResult: AnimeResponse,
    { fetchMoreResult }: { fetchMoreResult?: AnimeResponse },
  ) => {
    if (!fetchMoreResult) return previousResult;
    return {
      Page: {
        ...fetchMoreResult.Page,
        media: [...previousResult.Page.media, ...fetchMoreResult.Page.media],
      },
    };
  };
};

export const createFetchMoreVariables = (
  currentPage: number,
  viewMode: ViewMode,
  searchQuery?: string,
) => {
  const baseVariables = {
    page: currentPage + 1,
    perPage: 20,
  };

  if (viewMode === 'search' && searchQuery) {
    return { ...baseVariables, search: searchQuery };
  }

  return baseVariables;
};

export const useInfiniteScroll = (
  hasNextPage: boolean,
  isLoading: boolean,
  loadingMore: boolean,
  onLoadMore: () => void,
) => {
  useInfiniteScrollDetection({
    hasNextPage,
    isLoading,
    loadingMore,
    onLoadMore,
    threshold: 1000,
  });
};
