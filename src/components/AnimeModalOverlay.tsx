import { cn } from '@/lib/utils';

interface AnimeModalOverlayProps {
  isAnimating: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AnimeModalOverlay({
  isAnimating,
  onClose,
  children,
}: AnimeModalOverlayProps) {
  return (
    <div
      className={cn(
        `fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        transition-opacity
        duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`,
      )}
      data-lenis-prevent
    >
      <div
        className={cn(
          `absolute
          inset-0
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`,
        )}
        onClick={onClose}
      />
      {children}
    </div>
  );
}
