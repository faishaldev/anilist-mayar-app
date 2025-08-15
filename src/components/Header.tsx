import { SearchBar } from '@/components/SearchBar';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  searchLoading?: boolean;
}

export function Header({ onSearch, onClear, searchLoading }: HeaderProps) {
  return (
    <header
      className="
      border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40
    "
    >
      <div className="container mx-auto px-4 py-4">
        <div
          className="
            flex flex-col md:flex-row items-center
            justify-between gap-4
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
              w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600
              rounded-lg flex items-center justify-center
            "
            >
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            <h1
              className={cn(
                `text-2xl
                font-bold
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent`,
              )}
            >
              AniList Explorer
            </h1>
          </div>

          <div className="w-full md:w-fit">
            <SearchBar
              onSearch={onSearch}
              onClear={onClear}
              loading={searchLoading}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
