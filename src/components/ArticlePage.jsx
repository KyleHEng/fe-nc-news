import { useParams } from "react-router-dom";
import { articlesFetched } from "./axiosVariables";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(false);
  const [currVotes, setCurrVotes] = useState(null);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  useEffect(() => {
    setArticle(false);
    articlesFetched.get(`/${article_id}`).then((response) => {
      setArticle(response.data.article);
      setCurrVotes(response.data.article.votes);
    });
  }, []);
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;
  function articlePatchLike(inc_votes) {
    articlesFetched
      .patch(`/${article_id}`, { inc_votes })
      .then(() => {
        alert("Vote sent!");
      })
      .catch(() => {
        setCurrVotes(() => currVotes - inc_votes);
        alert("Vote failed to send!");
      });
  }
  function handleUpvote(e) {
    e.preventDefault();
    if (isUpvote) {
      setCurrVotes(() => {
        articlePatchLike(-1);
        return currVotes - 1;
      });
    }
    if (!isUpvote) {
      setCurrVotes(() => {
        articlePatchLike(1);
        return currVotes + 1;
      });
    }
    if (isDownvote) {
      articlePatchLike(2);
      setIsDownvote(false);
      setCurrVotes(() => {
        return currVotes + 2;
      });
    }
    setIsUpvote(!isUpvote);
  }
  function handleDownvote(e) {
    e.preventDefault();
    if (isDownvote) {
      articlePatchLike(1);
      setCurrVotes(() => {
        return currVotes + 1;
      });
    }
    if (!isDownvote) {
      articlePatchLike(-1);
      setCurrVotes(() => {
        return currVotes - 1;
      });
    }
    if (isUpvote) {
      articlePatchLike(-2);
      setIsUpvote(false);
      setCurrVotes(() => {
        return currVotes - 2;
      });
    }
    setIsDownvote(!isDownvote);
  }
  if (article === false) {
    return <p>Loading</p>;
  }
  return (
    <>
      <main className="article-page">
        <p id="topic-and-author">
          <span>Topic: {topic}</span> <span>Author: {author}</span>
        </p>
        <p>{title}</p>
        <img src={article_img_url}></img>
        <p>{body}</p>
        <p id="votes-and-comments">
          <button onClick={handleUpvote}>Upvote</button>{" "}
          <span>Votes: {currVotes}</span>
          <button onClick={handleDownvote}>Downvote</button>
          <span>Comments: {comment_count}</span>
        </p>
      </main>
      <section>
        <CommentCard article_id={article_id}></CommentCard>
      </section>
    </>
  );
}

export default ArticlePage;
