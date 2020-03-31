import React, { Component } from "react";
import api from "../../sevices/api";
import { login } from "../../sevices/auth";

class Login extends Component {
  state = { error: "" };

  getFormData() {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      this.loginAccount(email, password);
    }
  }

  async loginAccount(email, password) {
    try {
      const response = await api.post("/api/accounts/login", {
        email,
        password
      });
      login(response.data.token);
      this.props.history.push("/users/");
      location.reload(true);
    } catch (err) {
      this.setState({
        error: "Senha ou email incorretos"
      });
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="register col-md-4">
          <div className="d-flex justify-content-center cadastro-text">
            <h3>Acesse sua conta</h3>
          </div>
          <form onSubmit={this.getFormData.bind(this)}>
            <div className="login-form  justify-content-center">
              <div className=" justify-content-center">
                <div className="form-group  ">
                  <div className="form-group row ">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      ref="email"
                    />
                  </div>
                  <div className="form-group row ">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Senha"
                      ref="password"
                    />
                  </div>
                  <div className="form-group row justify-content-center login-button">
                    <button type="submit" className="btn btn-primary">
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {this.state.error && <p>{this.state.error}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
