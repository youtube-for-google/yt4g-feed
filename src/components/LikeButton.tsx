import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_LIKES } from "../graphql/queries";
import { LIKE_VIDEO } from "../graphql/mutations";

interface Props {
  videoId: string;
  userId: string;
}

interface GetLikesResponse {
  likes: number;
}
export default function LikeButton({ videoId, userId }: Props) {
  const { data, refetch } = useQuery<GetLikesResponse>(GET_LIKES, {
    variables: { videoId },
  });
  const [toggleLike] = useMutation(LIKE_VIDEO);

  const handleLike = async () => {
    await toggleLike({ variables: { videoId, userId } });
    refetch();
  };

  const count = data?.likes ?? 0;

  return (
    <button onClick={handleLike} style={{ marginRight: "0.5rem" }}>
      ❤️ {count}
    </button>
  );
}
