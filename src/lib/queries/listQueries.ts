import { gql } from '@apollo/client';
import { ANIME_BASIC_FIELDS, PAGE_INFO_FIELDS } from '../fragments';

export const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;

export const GET_POPULAR_ANIME = gql`
  query GetPopularAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;

export const GET_TOP_RATED_ANIME = gql`
  query GetTopRatedAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, sort: SCORE_DESC) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;

export const GET_UPCOMING_ANIME = gql`
  query GetUpcomingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;

export const GET_RECENTLY_COMPLETED_ANIME = gql`
  query GetRecentlyCompletedAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, status: FINISHED, sort: END_DATE_DESC) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;

export const SEARCH_ANIME = gql`
  query SearchAnime($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfoFields
      }
      media(type: ANIME, search: $search) {
        ...AnimeBasicFields
      }
    }
  }
  ${PAGE_INFO_FIELDS}
  ${ANIME_BASIC_FIELDS}
`;
