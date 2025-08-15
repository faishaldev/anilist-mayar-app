import { AnimeModal } from './components/AnimeModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Navigation } from './components/Navigation';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { useAnimeData } from './hooks/useAnimeData';
import { useAnimeModal } from './hooks/useAnimeModal';
import { useLenis } from './hooks/useLenis';
import { useScrollToTop } from './hooks/useScrollToTop';

export default function App() {
  const { stop, start } = useLenis();
  const { isVisible, scrollToTop } = useScrollToTop();
  const { selectedAnime, isModalOpen, handleAnimeClick, closeModal } =
    useAnimeModal();
  const {
    viewMode,
    loadingMore,
    handleViewModeChange,
    handleSearch,
    handleClearSearch,
    getCurrentData,
  } = useAnimeData();

  const currentData = getCurrentData();
  const currentAnimes = currentData.media;
  const currentLoading = currentData.loading;

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onClear={handleClearSearch}
        searchLoading={currentLoading && viewMode === 'search'}
      />
      <Navigation viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      <MainContent
        viewMode={viewMode}
        currentAnimes={currentAnimes}
        currentLoading={currentLoading}
        loadingMore={loadingMore}
        onAnimeClick={handleAnimeClick}
      />
      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={closeModal}
        onLenisStop={stop}
        onLenisStart={start}
      />
      {isVisible && <ScrollToTopButton onClick={scrollToTop} />}
      <Footer />
    </div>
  );
}
