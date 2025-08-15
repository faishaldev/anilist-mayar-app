import { gql } from '@apollo/client';

export const ANIME_BASIC_FIELDS = gql`
  fragment AnimeBasicFields on Media {
    id
    title {
      romaji
      english
      native
    }
    description
    coverImage {
      large
      medium
    }
    bannerImage
    genres
    averageScore
    popularity
    episodes
    duration
    status
    format
    source
    season
    seasonYear
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    studios {
      nodes {
        name
      }
    }
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
`;

export const ANIME_DETAILED_FIELDS = gql`
  fragment AnimeDetailedFields on Media {
    ...AnimeBasicFields
    staff {
      nodes {
        name {
          full
        }
      }
    }
    characters {
      nodes {
        name {
          full
        }
        image {
          medium
        }
      }
    }
    trailer {
      id
      site
    }
    tags {
      name
      description
      rank
    }
  }
  ${ANIME_BASIC_FIELDS}
`;
