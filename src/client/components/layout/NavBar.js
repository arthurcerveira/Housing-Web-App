import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

class NavBar extends Component {
  state = {
    links: [
      { to: "/users", text: "Usuários" },
      { to: "/login", text: "Login" },
      { to: "/register", text: "Registrar" }
    ]
  };

  renderNavLinks(to, text) {
    return (
      <li className="nav-item" key={text}>
        <StyledLink to={to} className="nav-link">
          {text}
        </StyledLink>
      </li>
    );
  }

  renderNavDropdowns() {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
          <StyledLink to="/" className="align-items-center">
            <span className="col-sn-5 mr-0 col-md-2 navbar-brand">Housing</span>
          </StyledLink>
          <div className="col-md-11 collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav ">
              {this.state.links.map(link =>
                this.renderNavLinks(link.to, link.text)
              )}
              {this.renderNavDropdowns()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
