import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import * as AuthActions from "../../store/actions/authentication";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(AuthActions.logoutAccount());
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location },
        }}
      />
    );
  }
}

export default connect()(Logout);
