import { useCallback, useEffect, useState } from 'react';

interface UseModalAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  animationDuration?: number;
  onOpen?: () => void;
  onClosed?: () => void;
}

export function useModalAnimation({
  isOpen,
  onClose,
  animationDuration = 200,
  onOpen,
  onClosed,
}: UseModalAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      onClosed?.();
    }, animationDuration);
  }, [onClose, onClosed, animationDuration]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      onOpen?.();
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), animationDuration);
    }
  }, [isOpen, onOpen, animationDuration]);

  return {
    isAnimating,
    shouldRender,
    handleClose,
  };
}

export function useModalEffects({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
}
