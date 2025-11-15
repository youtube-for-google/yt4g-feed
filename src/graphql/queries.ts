import { gql } from "@apollo/client";

export const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      id
      title
      channel
      views
      cat
      thumbnail
    }
  }
`;
