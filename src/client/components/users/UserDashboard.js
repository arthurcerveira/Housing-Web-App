import React, { Component } from "react";
import UserList from "./UserList";

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <UserList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
