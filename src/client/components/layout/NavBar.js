import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    links: [
      { to: "/users", text: "Usuários" },
      { to: "/login", text: "Entrar" },
      { to: "/register", text: "Cadastrar" }
    ]
  };

  renderNavLinks(to, text) {
    return (
      <li className="nav-item" key={text}>
        <Link to={to} className="nav-link styled-link">
          {text}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
          <Link to="/" className="align-items-center">
            <span className="col-md-2 navbar-brand">Housing</span>
          </Link>
          <div className="col-md-11 collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav ">
              {this.state.links.map(link =>
                this.renderNavLinks(link.to, link.text)
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
