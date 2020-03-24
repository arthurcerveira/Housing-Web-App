import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page col-lg-12">
        {/* <Link to="/register?role=estudante">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg btn-register"
          >
            Cadastrar como estudante
          </button>
        </Link>
        <Link to="/register?role=familia">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg btn-register"
          >
            Cadastrar como familía
          </button>
        </Link> */}
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
  }
}

export default LandingPage;
