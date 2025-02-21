import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { articlesFetched } from "./axiosVariables";

function NavBar() {
  const [isDropdown, setIsDropdown] = useState(false);

  const [topicList, setTopicList] = useState(false);
  useEffect(() => {
    axios
      .get("https://northcoders-news-backend-project.onrender.com/api/topics")
      .then(({ data: { topics } }) => {
        setTopicList(topics);
      });
  }, []);

  return (
    <header>
      <div className="nav-grid">
        <Link to={"/"} id="home-button">
          Home
        </Link>
        <Link to={"#"} onClick={() => setIsDropdown(!isDropdown)}>
          Topic
        </Link>
        {isDropdown ? (
          <ul className="topic-items">
            {topicList.map((topic) => {
              return (
                <TopicItem topicName={topic.slug} key={topic.slug}></TopicItem>
              );
            })}
          </ul>
        ) : null}
      </div>
    </header>
  );
}

function TopicItem({ topicName }) {
  return (
    <Link to={`/${topicName}`} className="topic-item">
      {topicName}
    </Link>
  );
}
export default NavBar;
