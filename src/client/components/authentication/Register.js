import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    url: "/api/accounts/register",
    name: "",
    email: "",
    password: "",
    description: "",
    role: "",
    id: "",
    feedback: "",
    redirect: false,
    roleFilter: "",
    readOnly: false
  };

  async componentDidMount() {
    let roleFilter = "";
    let readOnly = false;

    try {
      roleFilter = window.location.href.split("=")[1];
    } catch (err) {
      roleFilter = "";
    }

    switch (roleFilter) {
      case "familia":
        roleFilter = "familia anfitriã";
        readOnly = true;
        break;
      case "estudante":
        roleFilter = "estudante internacional";
        readOnly = true;
        break;
      default:
        roleFilter = "";
    }

    this.setState({ roleFilter, readOnly });
  }

  getFormData(event) {
    event.preventDefault();
    const name = `${this.refs.firstName.value.toLowerCase()} ${this.refs.lastName.value.toLowerCase()}`;
    const email = this.refs.email.value;
    let password = "";

    if (this.refs.password.value === this.refs.passwordConfirmation.value) {
      password = this.refs.password.value;
    }

    const description = this.refs.description.value;
    const role = this.refs.role.value;

    const account = { name, email, password, description, role };
    this.createAccount(account);
  }

  createAccount(account) {
    axios
      .post(this.state.url, account)
      .then(function(response) {
        return response.data.account;
      })
      .then(accountId => {
        console.log(accountId);
        this.setState({ id: accountId, redirect: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  roleSelector() {
    const options = (
      <React.Fragment>
        <option>estudante internacional</option>
        <option>familia anfitriã</option>
      </React.Fragment>
    );

    return this.state.readOnly ? (
      <select
        className="form-control text-capitalize select-role"
        value={this.state.roleFilter}
        ref="role"
        readOnly
      >
        {options}
      </select>
    ) : (
      <select
        className="form-control text-capitalize select-role"
        defaultValue={this.state.roleFilter}
        ref="role"
      >
        <option></option>
        {options}
      </select>
    );
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={`/users/${this.state.id}`} />;
    }
  }

  render() {
    return (
      <div className="register">
        <div className="d-flex justify-content-start cadastro-text">
          <h3>Cadastre-se</h3>
        </div>
        <form onSubmit={this.getFormData.bind(this)}>
          <div className="row">
            <div className="register-form col">
              <div className="row form-group">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    ref="firstName"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sobrenome"
                    ref="lastName"
                  />
                </div>
              </div>
              <div className="form-group ">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  ref="email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  ref="password"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirme a senha"
                  ref="passwordConfirmation"
                />
              </div>
            </div>
            <div className="register-form col">
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Descrição"
                  ref="description"
                ></textarea>
              </div>
              <div className="form-group">{this.roleSelector()}</div>
            </div>
          </div>

          <div className="row justify-content-center botao-registrar">
            <button type="submit" className="btn btn-primary ">
              Cadastrar
            </button>
          </div>
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Register;
