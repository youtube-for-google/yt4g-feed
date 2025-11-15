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

export const GET_COMMENTS = gql`
  query GetComments($videoId: ID!) {
    comments(videoId: $videoId) {
      id
      text
      author {
        name
        avatar
      }
    }
  }
`;

export const GET_LIKES = gql`
  query GetLikes($videoId: ID!) {
    likes(videoId: $videoId)
  }
`;
