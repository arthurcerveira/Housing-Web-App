import React, { Component } from "react";
import api from "./sevices/api";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import NavBar from "./components/layout/NavBar";

import Routes from "./routes";

export default class App extends Component {
  state = {
    api: "/api",
    message: ""
  };

  async componentDidMount() {
    const res = await api.get(this.state.api);
    console.log(res);
    this.setState({ message: res.data["message"] });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes />
          </div>
          <div className="server-status">{this.serverIsRunning()}</div>
        </div>
      </Router>
    );
  }

  serverIsRunning() {
    return (
      <div className="server-is-running-warning fixed-bottom">
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
