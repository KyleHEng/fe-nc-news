import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/Articles/ArticleList";
import ArticlePage from "./components/Articles/ArticlePage";
import NavBar from "./components/NavBar";
import React from "react";

export const UsernameContext = React.createContext();
function App() {
  return (
    <UsernameContext.Provider value="cooljmessy">
      <NavBar></NavBar>

      <Routes>
        <Route path="/:topic?" element={<ArticleList></ArticleList>}></Route>
        <Route
          path="/articles/:article_id"
          element={<ArticlePage></ArticlePage>}
        ></Route>
        <Route path="*" element={<p>404 not found</p>}></Route>
      </Routes>
    </UsernameContext.Provider>
  );
}

export default App;
