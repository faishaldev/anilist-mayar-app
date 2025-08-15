import { gql } from '@apollo/client';
import { ANIME_DETAILED_FIELDS } from '../fragments';

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeDetailedFields
    }
  }
  ${ANIME_DETAILED_FIELDS}
`;
