import { useContext, useState } from "react";
import { UsernameContext } from "../App";
import { articlesFetched } from "./axiosVariables";
function CommentTextarea({ article_id }) {
  const [commentTextarea, setCommentTextarea] = useState("");
  const username = useContext(UsernameContext);

  function handlePostingComment(e) {
    e.preventDefault();
    if (commentTextarea === "") {
      return alert("Comment can't be empty!");
    }
    alert("Comment has been sent to server!");
    articlesFetched
      .post(`/${article_id}/comments`, { username, body: commentTextarea })
      .then(() => {
        alert("Comment was posted!");
      })
      .catch(() => {
        alert("Comment wasn't posted!");
      });
  }
  return (
    <>
      <label htmlFor="comment-textarea">Post Comment: </label>
      <br></br>
      <textarea
        id="comment-textarea"
        value={commentTextarea}
        onChange={(e) => {
          setCommentTextarea(e.target.value);
        }}
      ></textarea>
      <br></br>
      <button onClick={handlePostingComment}>Submit</button>
    </>
  );
}

export default CommentTextarea;
