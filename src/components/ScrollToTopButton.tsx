import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

interface ScrollToTopButtonProps {
  onClick: () => void;
}

export function ScrollToTopButton({ onClick }: ScrollToTopButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        rounded-full w-12 h-12 p-0
        shadow-lg
      "
      size="icon"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
}
