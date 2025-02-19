import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
function App() {
  return (
    <>
      <header>Navbar goes here</header>
      <br></br>
      <Routes>
        <Route path="/" element={<ArticleList></ArticleList>}></Route>
        <Route
          path="/articles/:article_id"
          element={<ArticlePage></ArticlePage>}
        ></Route>
        <Route path="*" element={<p>404 not found</p>}></Route>
      </Routes>
    </>
  );
}

export default App;
