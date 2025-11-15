import { gql } from "@apollo/client";

export const LIKE_VIDEO = gql`
  mutation LikeVideo($videoId: ID!, $userId: ID!) {
    likeVideo(videoId: $videoId, userId: $userId)
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($videoId: ID!, $authorId: ID!, $text: String!) {
    addComment(videoId: $videoId, authorId: $authorId, text: $text) {
      id
      text
      author {
        name
      }
    }
  }
`;
