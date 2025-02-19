import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
