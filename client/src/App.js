import UserProfile from "./components/UserProfile";
import DashBoard from "./components/DashBoard";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashBoard" component={DashBoard} />
            <Route exact path="/userProfile" component={UserProfile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
