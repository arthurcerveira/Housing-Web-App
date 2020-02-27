import React, { Component } from "react";
import axios from "axios";

import UserCard from "./UserCard";

class UserList extends Component {
  state = {
    url: "/api/accounts/",
    users: null,
    userIsEmpty: false
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    const userIsEmpty = Object.keys(res.data).length === 0;

    this.setState({ users: res.data, userIsEmpty });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.users ? (
          this.state.userIsEmpty ? (
            <h3 className="no-users">Não há usuários ainda</h3>
          ) : (
            <div className="row">
              {this.state.users.map(user => (
                <UserCard
                  key={user._id}
                  id={user._id}
                  name={user.name}
                  role={user.role}
                  description={user.description}
                />
              ))}
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
