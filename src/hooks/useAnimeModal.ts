import type { Anime } from '@/types';
import { useState } from 'react';

export const useAnimeModal = () => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    selectedAnime,
    isModalOpen,
    handleAnimeClick,
    closeModal,
  };
};
