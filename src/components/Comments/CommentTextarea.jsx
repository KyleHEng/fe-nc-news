import { useContext, useState } from "react";
import { UsernameContext } from "../../App";
import { articlesFetched } from "../axiosVariables";
function CommentTextarea({ article_id, setCommentsList }) {
  const [commentTextarea, setCommentTextarea] = useState("");
  const username = useContext(UsernameContext);
  const [commentToggles, setCommentToggles] = useState({
    isTextareaEmpty: null,
    isCommentSent: false,
    isCommentFail: false,
  });
  const { isTextareaEmpty, isCommentSent, isCommentFail, isCommentSuccess } =
    commentToggles;
  function handlePostingComment(e) {
    e.preventDefault();
    setCommentToggles(() => {
      return {
        isTextareaEmpty: null,
        isCommentSent: false,
        isCommentFail: false,
        isCommentSuccess: false,
      };
    });
    if (commentTextarea === "") {
      return setCommentToggles((toggles) => {
        return { ...toggles, isTextareaEmpty: true };
      });
    }
    setCommentToggles((toggles) => {
      return { ...toggles, isCommentSent: true };
    });
    articlesFetched
      .post(`/${article_id}/comments`, { username, body: commentTextarea })
      .then(({ data: { comment } }) => {
        console.log(comment);
        setCommentsList((existingComments) => {
          return [...existingComments, comment];
        });
        setCommentToggles((toggles) => {
          return { ...toggles, isCommentSent: false, isCommentSuccess: true };
        });
      })
      .catch(() => {
        setCommentToggles((toggles) => {
          return { ...toggles, isCommentFail: true, isCommentSent: false };
        });
      });
  }
  return (
    <>
      <label htmlFor="comment-textarea">Post Comment: </label>
      <textarea
        id="comment-textarea"
        value={commentTextarea}
        onChange={(e) => {
          setCommentTextarea(e.target.value);
        }}
      ></textarea>
      <button onClick={handlePostingComment}>Submit</button>
      {isTextareaEmpty ? <p>Textarea Can't be empty!</p> : null}
      {isCommentSent ? <p>Comment is being sent</p> : null}
      {isCommentFail ? <p>Comment failed to send</p> : null}
      {isCommentSuccess ? <p>Comment was sent!</p> : null}
    </>
  );
}

export default CommentTextarea;
