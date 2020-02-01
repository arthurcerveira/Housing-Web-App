import React, { Component } from "react";
import axios from "axios";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./app.css";
import NavBar from "./components/layout/NavBar";

import LandingPage from "./components/landing_page/LandingPage";

import UserDashboard from "./components/users/UserDashboard";
import User from "./components/users/User";

export default class App extends Component {
  state = {
    api: "/api",
    message: ""
  };

  async componentDidMount() {
    const res = await axios.get(this.state.api);
    console.log(res);
    this.setState({ message: res.data["message"] });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/users" component={UserDashboard} />
              <Route exact path="/users/:userId" component={User} />
            </Switch>
            <div className="server-status">{this.serverIsRunning()}</div>
          </div>
        </div>
      </Router>
    );
  }

  serverIsRunning() {
    return (
      <div className="server-is-running-warning">
        {this.state.message ? (
          <h5 className="alert alert-success" role="alert">
            {this.state.message}
          </h5>
        ) : (
          <h5 className="alert alert-warning" role="alert">
            Server is not running
          </h5>
        )}
      </div>
    );
  }
}
