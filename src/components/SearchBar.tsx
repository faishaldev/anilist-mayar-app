import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  loading?: boolean;
}

export function SearchBar({
  onSearch,
  onClear,
  placeholder = 'Search anime...',
  loading,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      relative max-w-md mx-auto
    "
    >
      <div className="relative">
        <Search
          className="
          absolute left-3 top-1/2 transform -translate-y-1/2
          text-muted-foreground w-4 h-4
        "
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20"
          disabled={loading}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="
              absolute right-12 top-1/2 transform -translate-y-1/2
              h-6 w-6 p-0
            "
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={!query.trim() || loading}
          className="
            absolute right-1 top-1/2 transform -translate-y-1/2
            h-8
          "
        >
          {loading ? (
            <div
              className="
              w-4 h-4 border-2 border-current border-t-transparent
              rounded-full animate-spin
            "
            />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
