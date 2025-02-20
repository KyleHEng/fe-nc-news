import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import NavBar from "./components/NavBar";
import React from "react";

export const UsernameContext = React.createContext();
function App() {
  return (
    <UsernameContext.Provider value="cooljmessy">
      <NavBar></NavBar>
      <br></br>
      <Routes>
        <Route path="/" element={<ArticleList></ArticleList>}></Route>
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
