import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h2>Landing Page</h2>
        <Link to="/users">Users</Link>
      </div>
    );
  }
}

export default LandingPage;
