import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_COMMENTS } from "../graphql/queries";
import { ADD_COMMENT } from "../graphql/mutations";

interface Props {
  videoId: string;
  authorId: string;
}

interface CommentItem {
  id: string;
  text: string;
  author: {
    name: string;
    avatar?: string;
  };
}

interface GetCommentsResponse {
  comments: CommentItem[];
}

export default function CommentsSection({ videoId, authorId }: Props) {
  const { data, refetch } = useQuery<GetCommentsResponse>(GET_COMMENTS, {
    variables: { videoId },
  });
  const [addComment] = useMutation(ADD_COMMENT);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment({ variables: { videoId, authorId, text } });
    setText("");
    refetch();
  };

  const comments = data?.comments ?? [];

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          style={{ width: "70%", marginRight: "0.5rem" }}
        />
        <button type="submit">Post</button>
      </form>
      {comments.map((c: CommentItem) => (
        <p key={c.id}>
          <strong>{c.author.name}:</strong> {c.text}
        </p>
      ))}
    </div>
  );
}
