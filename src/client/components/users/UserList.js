import React, { Component } from "react";
import axios from "axios";

import UserCard from "./UserCard";

class UserList extends Component {
  state = {
    url: "/api/accounts/",
    users: [],
    userIsEmpty: false,
    nameFilter: "",
    roleFilter: ""
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    const userIsEmpty = Object.keys(res.data).length === 0;
    let roleFilter = "";

    try {
      roleFilter = window.location.href.split("=")[1];
    } catch (err) {
      roleFilter = "";
    }

    switch (roleFilter) {
      case "familia":
        roleFilter = "familia anfitriã";
        break;
      case "estudante":
        roleFilter = "estudante internacional";
        break;
      default:
        roleFilter = "";
    }

    this.setState({ users: res.data, userIsEmpty, roleFilter });
  }

  updateNameFilter(event) {
    this.setState({ nameFilter: event.target.value });
  }

  updateRoleFilter(event) {
    this.setState({ roleFilter: event.target.value });
  }

  filterUsers() {
    let filteredUsers = this.state.users;

    filteredUsers = filteredUsers.filter(
      user =>
        user.name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) !==
        -1
    );

    filteredUsers = filteredUsers.filter(user =>
      this.state.roleFilter ? user.role === this.state.roleFilter : true
    );

    return filteredUsers;
  }

  render() {
    let filteredUsers = this.filterUsers();

    return (
      <React.Fragment>
        {this.state.users ? (
          this.state.userIsEmpty ? (
            <h3 className="no-users">Não há usuários ainda</h3>
          ) : (
            <div className="user-list">
              <div className="row filter">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    value={this.state.nameFilter}
                    onChange={this.updateNameFilter.bind(this)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="text-capitalize form-control"
                    value={this.state.roleFilter}
                    onChange={this.updateRoleFilter.bind(this)}
                  >
                    <option></option>
                    <option>estudante internacional</option>
                    <option>familia anfitriã</option>
                  </select>
                </div>
              </div>
              <div className="row">
                {filteredUsers.map(user => (
                  <UserCard
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    role={user.role}
                    description={user.description}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="loading">
            <h3 className="loading-text">Carregando usuários</h3>
            <div
              className="spinner-border mx-auto"
              style={{
                display: "flex"
              }}
            ></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default UserList;
