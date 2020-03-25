import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../sevices/auth";

class Logout extends Component {
  componentDidMount() {
    logout();
    location.reload(true);
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location }
        }}
      />
    );
  }
}

export default Logout;
