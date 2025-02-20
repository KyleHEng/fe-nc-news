import { useEffect, useState } from "react";
import { articlesFetched } from "../axiosVariables";
import ArticleListCard from "./ArticleListCard";

function ArticleList() {
  const [articles, setArticles] = useState(false);
  const [limitAndPage, setLimitAndPage] = useState({ limit: 10, p: 1 });
  useEffect(() => {
    setArticles(false);
    articlesFetched("", { params: limitAndPage }).then((response) => {
      setArticles(response.data.articles);
    });
  }, [limitAndPage]);

  if (articles === false) {
    return <p>Loading</p>;
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
