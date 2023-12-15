import React, { Component } from "react";
import SearchBox from "./searchBox";
import CardList from "./cardList";
import { robots } from "./robots";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
      return response.json().then((users) => {
        this.setState({ robots: users });
      });
    });
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const filterRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (robots.length === 0) {
      return <h1>Loading....</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">Robot Friends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filterRobots} />
        </div>
      );
    }
  }
}

export default App;
