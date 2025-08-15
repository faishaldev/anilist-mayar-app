import { useModalAnimation, useModalEffects } from '@/lib/modalUtils';

interface UseAnimeModalLogicProps {
  isOpen: boolean;
  onClose: () => void;
  onLenisStop?: () => void;
  onLenisStart?: () => void;
}

export function useAnimeModalLogic({
  isOpen,
  onClose,
  onLenisStop,
  onLenisStart,
}: UseAnimeModalLogicProps) {
  const modalAnimation = useModalAnimation({
    isOpen,
    onClose,
    onOpen: onLenisStop,
    onClosed: onLenisStart,
  });

  useModalEffects({ isOpen, onClose: modalAnimation.handleClose });

  return modalAnimation;
}
