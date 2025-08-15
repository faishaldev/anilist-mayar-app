import { useScrollVisibility, useScrollToFunction } from '@/lib/scrollUtils';
import { useLenis } from './useLenis';

export function useScrollToTop() {
  const isVisible = useScrollVisibility(400);
  const { scrollTo } = useLenis();
  const scrollToTop = useScrollToFunction(scrollTo);

  return {
    isVisible,
    scrollToTop: () => scrollToTop(0),
  };
}
