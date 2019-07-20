import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { API, graphqlOperation } from "aws-amplify";

function App() {
  const [restaurants, setrestaurants] = useState([]);
  const query = `
  query {
    listRestaurants  {
      items {
        id name description location
      }
    }
  }
  `;

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await API.graphql(graphqlOperation(query));
      setrestaurants(data.data.listRestaurants.items);
    }

    fetchMyAPI();
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {restaurants.map((restaurant, index) => (
          <p key={index}> {restaurant.name} </p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
