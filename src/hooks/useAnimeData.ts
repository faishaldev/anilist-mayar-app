import type { ViewMode } from '@/types/viewMode';
import { useApolloClient } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useAnimeQueries } from './useAnimeQueries';
import {
  createFetchMoreVariables,
  createUpdateQuery,
  useInfiniteScroll,
} from './utils/paginationUtils';

export const useAnimeData = () => {
  const client = useApolloClient();
  const [viewMode, setViewMode] = useState<ViewMode>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  const queries = useAnimeQueries(viewMode, searchQuery);

  const handleViewModeChange = useCallback(
    (newViewMode: ViewMode) => {
      client.cache.evict({ fieldName: 'Page' });
      client.cache.gc();
      setViewMode(newViewMode);
    },
    [client],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handleViewModeChange('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    handleViewModeChange('trending');
  };

  const getCurrentData = useCallback(() => {
    const currentQuery = queries[viewMode];
    return {
      media: currentQuery.data?.Page.media || [],
      pageInfo: currentQuery.data?.Page.pageInfo,
      loading: currentQuery.loading,
    };
  }, [queries, viewMode]);

  const handleLoadMore = useCallback(async () => {
    const currentData = getCurrentData();
    if (!currentData.pageInfo?.hasNextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const currentQuery = queries[viewMode];
      const variables = createFetchMoreVariables(
        currentData.pageInfo.currentPage,
        viewMode,
        searchQuery,
      );

      await currentQuery.fetchMore({
        variables,
        updateQuery: createUpdateQuery(),
      });
    } catch (error) {
      console.error('Error loading more anime:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [getCurrentData, loadingMore, viewMode, searchQuery, queries]);

  const currentData = getCurrentData();
  useInfiniteScroll(
    currentData.pageInfo?.hasNextPage || false,
    currentData.loading,
    loadingMore,
    handleLoadMore,
  );

  return {
    viewMode,
    searchQuery,
    loadingMore,
    handleViewModeChange,
    handleSearch,
    handleClearSearch,
    getCurrentData,
    handleLoadMore,
  };
};
