import { useParams } from "react-router-dom";
import { articlesFetched } from "./axiosVariables";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(false);
  useEffect(() => {
    setArticle(false);
    articlesFetched.get(`/${article_id}`).then((response) => {
      setArticle(response.data.article);
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
          <span>Votes: {votes}</span> <span>Comments: {comment_count}</span>
        </p>
      </main>
      <section>
        <CommentCard article_id={article_id}></CommentCard>
      </section>
    </>
  );
}

export default ArticlePage;
