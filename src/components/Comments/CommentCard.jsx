import { useContext, useState } from "react";
import { UsernameContext } from "../../App";
import axios from "axios";
function CommentCard({ comment, setCommentsList, commentsList }) {
  const [commentDeleteToggles, setIsCommentDeleteToggles] = useState({
    isCommentDeleting: false,
    isCommentDeleteFail: false,
  });
  const { isCommentDeleting, isCommentDeleteFail } = commentDeleteToggles;

  const username = useContext(UsernameContext);

  function handleDeletingComment(e) {
    e.preventDefault();

    setIsCommentDeleteToggles({
      isCommentDeleting: false,
      isCommentDeleteFail: false,
    });

    setIsCommentDeleteToggles((toggles) => {
      return { ...toggles, isCommentDeleting: true };
    });

    setCommentsList(() => {
      return commentsList.filter((comment) => {
        return comment.comment_id !== +e.target.value;
      });
    });

    axios
      .delete(
        `https://northcoders-news-backend-project.onrender.com/api/comments/${e.target.value}`
      )
      .then(() => {
        setIsCommentDeleteToggles((toggles) => {
          return { ...toggles, isCommentDeleting: false };
        });
      })
      .catch((toggles) => {
        return {
          ...toggles,
          isCommentDeleting: false,
          isCommentDeleteFail: true,
        };
      });
  }

  return (
    <div className="comment-container" key={comment.comment_id}>
      <p className="flex-space-between">
        <span>{comment.author}</span> <span>{comment.created_at}</span>
      </p>
      <p>{comment.body}</p>
      <p className="flex-space-between">
        <span>Votes: {comment.votes}</span>{" "}
        {comment.author === username ? (
          <button value={comment.comment_id} onClick={handleDeletingComment}>
            Delete
          </button>
        ) : null}
      </p>
      {isCommentDeleting ? <p>A comment is being deleted</p> : null}
      {isCommentDeleteFail ? <p>Comment failed to delete</p> : null}
    </div>
  );
}

export default CommentCard;
