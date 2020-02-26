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
    Links: [
      { to: "/users", text: "Users" },
      { to: "/login", text: "Sign in" },
      { to: "/register", text: "Sign up" }
    ]
  };

  renderNavLinks() {
    return this.state.Links.map(link => (
      <li className="nav-item">
        <StyledLink to={link.to}>
          <a className="nav-link">{link.text}</a>
        </StyledLink>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
          <StyledLink to="/">
            <a className="navbar-brand col-sn-5 col-md-2 mr-0 align-items-center">
              Housing
            </a>
          </StyledLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="ml-5 collapse navbar-collapse">
            <ul className="navbar-nav">{this.renderNavLinks()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
