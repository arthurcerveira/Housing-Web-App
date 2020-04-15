import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  renderRedirect = () => {
    return (
      <Redirect
        to={{
          pathname: "/users",
          state: { from: this.props.location },
        }}
      />
    );
  };

  renderLandingPage = () => {
    return (
      <div className="landing-page col-lg-12">
        <h2>Landing Page</h2>
        <Link to="/users?role=estudante">
          <button type="button" className="btn btn-primary btn-lg btn-register">
            Procuro um estudante internacional
          </button>
        </Link>
        <Link to="/users?role=familia">
          <button
            type="button"
            className="btn btn-secondary btn-lg btn-register"
          >
            Procuro uma familía anfitriã
          </button>
        </Link>
      </div>
    );
  };

  render() {
    return this.props.isLoggedIn
      ? this.renderRedirect()
      : this.renderLandingPage();
  }
}

export default connect((state) => ({
  isLoggedIn: state.authentication.isLoggedIn,
}))(LandingPage);
