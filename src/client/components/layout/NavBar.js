import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../sevices/api";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        // { to: "/users", text: "Usuários" },
        { to: "/login", text: "Entrar" },
        { to: "/register", text: "Cadastrar" },
      ],
      username: "",
      imageUrl: "",
      userId: "",
      rightSide: null,
    };
  }

  async getAccountInfo() {
    if (this.props.isLoggedIn) {
      const res = await api.get(`/api/logged`);

      const userId = res.data._id;
      const username = res.data.name;
      const imageUrl =
        "https://avatars0.githubusercontent.com/u/45042445?s=460&v=4";

      this.setState({ username, imageUrl, userId });
    }
  }

  renderNavLinks() {
    const links = this.state.links.map((link) =>
      this.renderNavLink(link.to, link.text)
    );

    return <ul className="navbar-nav">{links}</ul>;
  }

  renderNavLink(to, text) {
    return (
      <li className="nav-item" key={text}>
        <Link to={to} className="nav-link styled-link">
          {text}
        </Link>
      </li>
    );
  }

  renderLoggedUser() {
    this.getAccountInfo();

    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to={`/users/${this.state.userId}`}
            className=" nav-link styled-link text-capitalize"
          >
            {this.state.username}{" "}
            {/* <img src={this.state.imageUrl} className="nav-picture" /> */}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link styled-link">
            Sair
          </Link>
        </li>
      </ul>
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
            {this.props.isLoggedIn
              ? this.renderLoggedUser()
              : this.renderNavLinks()}
            {/* {this.state.rightSide} */}
          </div>
        </nav>
      </div>
    );
  }
}

export default connect((state) => ({
  isLoggedIn: state.authentication.isLoggedIn,
}))(NavBar);
