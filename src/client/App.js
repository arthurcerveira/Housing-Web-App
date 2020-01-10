import React, { Component } from "react";
import axios from "axios";

import "./app.css";

export default class App extends Component {
  state = {
    message: "did not work"
  };

  async componentDidMount() {
    const res = await axios.get("/api");
    console.log(res);
    this.setState({ message: res.data["message"] });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Housing Web App</h1>
        <h5>{this.state.message}</h5>
      </React.Fragment>
    );
  }
}
