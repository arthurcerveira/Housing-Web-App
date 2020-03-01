import React, { Component } from "react";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    description: "",
    role: ""
  };

  render() {
    return (
      <div className="register">
        <div className=" d-flex justify-content-start cadastro-text">
          <h3>Cadastre-se</h3>
        </div>
        <div className="row">
          <form className="register-form col">
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sobrenome"
                />
              </div>
            </div>
            <div className="form-group ">
              {/* <label for="exampleInputEmail1">Email address</label> */}
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              {/* <label for="exampleInputPassword1">Password</label> */}
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
              />
            </div>
            <div className="form-group">
              {/* <label for="exampleInputPassword1">Password</label> */}
              <input
                type="password"
                className="form-control"
                placeholder="Confirme a senha"
              />
            </div>
          </form>
          <form className="register-form col">
            <div className="form-group">
              {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
              <textarea
                className="form-control"
                rows="5"
                placeholder="Descrição"
              ></textarea>
            </div>
            <div className="form-group">
              <select class="form-control text-capitalize select-role">
                <option></option>
                <option>estudante internacional</option>
                <option>familia anfitriã</option>
              </select>
            </div>
          </form>
        </div>
        <div className="row justify-content-center botao-registrar">
          <button type="submit" class="  btn btn-primary ">
            Cadastrar
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
