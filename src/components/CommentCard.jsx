import { useEffect, useState } from "react";
import { articlesFetched } from "./axiosVariables";

function CommentCard({ article_id }) {
  const [commentsList, setCommentsList] = useState(false);
  useEffect(() => {
    setCommentsList(false);
    articlesFetched.get(`/${article_id}/comments`).then((response) => {
      setCommentsList(response.data.comments);
    });
  }, []);

  if (commentsList === false) {
    return <p>Loading comments</p>;
  }
  const { author, body, created_at, votes } = commentsList;

  return (
    <>
      {commentsList.map((comment) => {
        return (
          <div className="comment-container" key={comment.comment_id}>
            <p>
              <span>{comment.author}</span> <span>{comment.created_at}</span>
            </p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        );
      })}
    </>
  );
}

export default CommentCard;
