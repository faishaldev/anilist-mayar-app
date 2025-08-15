import type { Anime } from '@/types';
import parse from 'html-react-parser';
import { modalSectionHeader } from '@/lib/styleUtils';

interface AnimeModalSynopsisProps {
  anime: Anime;
}

export function AnimeModalSynopsis({ anime }: AnimeModalSynopsisProps) {
  const cleanDescription = anime.description || 'No description available.';

  return (
    <div className="mb-6">
      <h3 className={modalSectionHeader}>Synopsis</h3>
      <div className="text-muted-foreground leading-relaxed">
        {parse(cleanDescription)}
      </div>
    </div>
  );
}
