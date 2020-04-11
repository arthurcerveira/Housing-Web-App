import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { isAuthenticated } from "../../sevices/auth";

class LandingPage extends Component {
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
    return isAuthenticated() ? this.renderRedirect() : this.renderLandingPage();
  }
}

export default LandingPage;
