import { useEffect, useState } from "react";
import { articlesFetched } from "../axiosVariables";
import ArticleListCard from "./ArticleListCard";
import { useLocation, useParams } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState(false);
  const [limitAndPage, setLimitAndPage] = useState({ limit: 10, p: 1 });
  const { topic } = useParams();
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const existingTopics = ["coding", "football", "cooking", undefined];

  useEffect(() => {
    setArticles(false);
    articlesFetched("", {
      params: { ...limitAndPage, topic, sort_by: sortBy, order },
    }).then((response) => {
      setArticles(response.data.articles);
    });
  }, [limitAndPage, topic, sortBy, order]);

  if (articles === false) {
    return <p>Loading</p>;
  }

  if (!existingTopics.includes(topic)) {
    return <p>Topic not found!</p>;
  }
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          const limitAndPageCopy = { ...limitAndPage };
          limitAndPageCopy.limit = 10000;
          setLimitAndPage(limitAndPageCopy);
        }}
      >
        All articles
      </button>
      <button onClick={() => setIsSortByOpen(!isSortByOpen)}>Sort By</button>
      {isSortByOpen ? (
        <ul className="sort-by-container">
          <li onClick={() => setSortBy("created_at")}>Date</li>
          <li onClick={() => setSortBy("comment_count")}>Comment Count</li>
          <li onClick={() => setSortBy("votes")}>Votes</li>
          <li onClick={() => setIsOrderOpen(!isOrderOpen)}>Order</li>
          {isOrderOpen ? (
            <>
              <span onClick={() => setOrder("asc")}>Ascending</span>{" "}
              <span onClick={() => setOrder("desc")}>Descending</span>
            </>
          ) : null}
        </ul>
      ) : null}
      <main>
        {articles.map((article) => {
          return (
            <ArticleListCard
              key={article.article_id}
              articleData={article}
            ></ArticleListCard>
          );
        })}
      </main>
    </>
  );
}

export default ArticleList;
