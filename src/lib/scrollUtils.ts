import { useEffect, useCallback, useState } from 'react';

export function useScrollVisibility(threshold: number = 400) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}

export function useInfiniteScrollDetection({
  hasNextPage,
  isLoading,
  loadingMore,
  onLoadMore,
  threshold = 1000,
}: {
  hasNextPage: boolean;
  isLoading: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}) {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        if (hasNextPage && !loadingMore && !isLoading) {
          onLoadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isLoading, loadingMore, onLoadMore, threshold]);
}

export function useScrollToFunction(
  scrollTo: (
    target: number | string,
    options?: { offset?: number; duration?: number },
  ) => void,
) {
  return useCallback(
    (target: number | string = 0, options?: { duration?: number }) => {
      scrollTo(target, { duration: 1, ...options });
    },
    [scrollTo],
  );
}
