import { useEffect, useState } from "react";
import { articlesFetched } from "../axiosVariables";

import CommentCard from "./CommentCard";
import CommentTextarea from "./CommentTextarea";
function CommentList({ article_id }) {
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
  return (
    <>
      <CommentTextarea
        article_id={article_id}
        commentsList={commentsList}
        setCommentsList={setCommentsList}
      ></CommentTextarea>
      {commentsList.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            setCommentsList={setCommentsList}
            commentsList={commentsList}
          ></CommentCard>
        );
      })}
    </>
  );
}

export default CommentList;
