import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page col-lg-12">
        <h2>Landing Page</h2>
        <button type="button" className="btn btn-primary btn-lg btn-register">
          <Link className="styled-link" to="/users">
            Procuro um estudante internacional
          </Link>
        </button>
        <button type="button" className="btn btn-secondary btn-lg btn-register">
          <Link className="styled-link" to="/users">
            Procuro uma familía anfitriã
          </Link>
        </button>
      </div>
    );
  }
}

export default LandingPage;
