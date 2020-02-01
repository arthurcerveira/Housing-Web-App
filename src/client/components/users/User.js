import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  state = {
    name: "",
    imageUrl: "https://avatars0.githubusercontent.com/u/45042445?s=460&v=4",
    role: "",
    description: "",
    userId: "",
    likes: "",
    matches: ""
  };

  async componentDidMount() {
    let { userId } = this.props.match.params;

    const userUrl = `/api/accounts/${userId}`;

    const res = await axios.get(userUrl);
    const name = res.data.name;
    const role = res.data.role;
    const description = res.data.description;
    const likes = res.data.likes;
    const matches = res.data.matches;

    this.setState({ name, role, description, likes, matches });
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5 className="float-left text-capitalize text-muted">
                  {this.state.role}
                </h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 user-image">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2 "
                />
              </div>
              <div className="col-md-9 user-info">
                <h4 className="row text-capitalize user-name">
                  {this.state.name}
                </h4>
                <div className="row align-items-center">
                  <div className={`row col-12 col-md-3`}>
                    <p className="text-muted">Description: </p>
                    <p>{this.state.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
