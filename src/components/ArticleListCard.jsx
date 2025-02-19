function ArticleListCard({ articleData }) {
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = articleData;
  return (
    <div className="article-list-card">
      <p>
        <span>Topic: {topic}</span> <span>Author: {author}</span>
      </p>
      <p>{title}</p>
      <img src={article_img_url}></img>
      <p>
        <span>Votes: {votes}</span> <span>Comments: {comment_count}</span>
      </p>
    </div>
  );
}

export default ArticleListCard;
