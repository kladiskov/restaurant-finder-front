import React, { Component } from "react";
import Restaurants from "./components/restaurants";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Restaurants />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
