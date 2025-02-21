import { useParams } from "react-router-dom";
import { articlesFetched } from "../axiosVariables";
import { useEffect, useState } from "react";
import CommentList from "../Comments/CommentList";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(false);
  const [currVotes, setCurrVotes] = useState(null);
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownvote] = useState(false);
  const [isVoteSent, setIsVoteSent] = useState(false);
  const [isVoteFail, setIsVoteFail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setArticle(false);
    articlesFetched
      .get(`/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setCurrVotes(response.data.article.votes);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.response.data.msg);
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
  } = article;
  function articlePatchLike(inc_votes) {
    setIsVoteFail(false);
    setIsVoteSent(true);
    articlesFetched.patch(`/${article_id}`, { inc_votes }).catch(() => {
      setCurrVotes(() => currVotes - inc_votes);
      setIsVoteSent(false);
      setIsVoteFail(true);
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

  if (isError) {
    return <p>{errorMessage}</p>;
  }
  if (article === false) {
    return <p>Loading</p>;
  }
  return (
    <>
      <main className="article-page">
        <p className="flex-space-between">
          <span>Topic: {topic}</span> <span>Author: {author}</span>
        </p>
        <p>{title}</p>
        <img src={article_img_url}></img>
        <p>{body}</p>
        <p className="flex-space-between">
          <button onClick={handleUpvote}>Upvote</button>{" "}
          <span>Votes: {currVotes}</span>
          <button onClick={handleDownvote}>Downvote</button>
          <span>Comments: {comment_count}</span>
        </p>
        {isVoteSent ? <p>Vote is sent!</p> : null}
        {isVoteFail ? <p>Vote failed to send!</p> : null}
      </main>

      <section aria-label="comment section">
        <CommentList article_id={article_id}></CommentList>
      </section>
    </>
  );
}

export default ArticlePage;
