export interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
}

export interface CoverImage {
  large: string;
  medium: string;
}

export interface AnimeDate {
  year: number;
  month: number;
  day: number;
}

export interface Studio {
  name: string;
}

export interface Anime {
  id: number;
  title: AnimeTitle;
  description: string;
  coverImage: CoverImage;
  bannerImage: string;
  genres: string[];
  averageScore: number;
  popularity: number;
  episodes: number;
  duration?: number;
  status: string;
  startDate: AnimeDate;
  endDate: AnimeDate;
  season?: string;
  seasonYear?: number;
  studios: {
    nodes: Studio[];
  };
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface AnimePage {
  pageInfo: PageInfo;
  media: Anime[];
}

export interface AnimeResponse {
  Page: AnimePage;
}
