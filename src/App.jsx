import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router";
import ArticleList from "./components/ArticleList";
function App() {
  return (
    <>
      <header>Navbar goes here</header>
      <br></br>
      <Routes>
        <Route path="/" element={<ArticleList></ArticleList>}></Route>
      </Routes>
    </>
  );
}

export default App;
