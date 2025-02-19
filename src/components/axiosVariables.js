import axios from "axios";

const articlesFetched = axios.create({
  baseURL: "https://northcoders-news-backend-project.onrender.com/api/articles",
});

export { articlesFetched };
