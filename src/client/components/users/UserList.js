import React, { Component } from "react";
import axios from "axios";

import UserCard from "./UserCard";

class UserList extends Component {
  state = {
    url: "/api/accounts/",
    users: [],
    userIsEmpty: false,
    nameFilter: ""
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    const userIsEmpty = Object.keys(res.data).length === 0;

    this.setState({ users: res.data, userIsEmpty });
  }

  updateNameFilter(event) {
    this.setState({ nameFilter: event.target.value });
  }

  render() {
    let filteredUsers = this.state.users.filter(
      user =>
        user.name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) !==
        -1
    );

    return (
      <React.Fragment>
        {this.state.users ? (
          this.state.userIsEmpty ? (
            <h3 className="no-users">Não há usuários ainda</h3>
          ) : (
            <div className="user-list">
              <div className="row filter">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control text-muted"
                    value={this.state.nameFilter}
                    onChange={this.updateNameFilter.bind(this)}
                  />
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
