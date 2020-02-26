import React, { Component } from "react";
import axios from "axios";

import UserCard from "./UserCard";

class UserList extends Component {
  state = {
    url: "/api/accounts/",
    user: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ user: res.data });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.user ? (
          <div className="row">
            {this.state.user.map(user => (
              <UserCard
                key={user._id}
                id={user._id}
                name={user.name}
                role={user.role}
                description={user.description}
              />
            ))}
          </div>
        ) : (
          <div className="loading">
            <h3 className="loading-text">Loading Users</h3>
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
