import React, { useState, useEffect } from "react";
import SearchBox from "../components/searchBox";
import CardList from "../components/cardList";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchField] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setRobots(users);
      });
  }, []);
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filterRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  if (robots.length === 0) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f1">Robot Friends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
