import { Link } from "react-router-dom";

function ArticleListCard({ articleData }) {
  const {
    article_img_url,
    author,
    comment_count,
    title,
    topic,
    votes,
    article_id,
  } = articleData;
  return (
    <div className="article-list-card">
      <p className="flex-space-between">
        <span>Topic: {topic}</span> <span>Author: {author}</span>
      </p>
      <Link to={`/articles/${article_id}`}>
        <p>{title}</p>{" "}
      </Link>
      <img src={article_img_url}></img>
      <p className="flex-space-between">
        <span>Votes: {votes}</span> <span>Comments: {comment_count}</span>
      </p>
    </div>
  );
}

export default ArticleListCard;
