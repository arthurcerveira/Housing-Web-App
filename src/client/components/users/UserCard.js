import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserCard extends Component {
  state = {
    name: "",
    imageUrl: "https://avatars0.githubusercontent.com/u/45042445?s=460&v=4",
    role: "",
    description: "",
    id: "",
    imageLoading: true
  };

  componentDidMount() {
    const { name, role, description, id } = this.props;

    this.setState({
      name,
      role,
      description,
      id
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Link className="styled-link black-text" to={`users/${this.state.id}`}>
          <div className="card user-card">
            <h5 className="card-header text-capitalize">
              <b>{this.state.name}</b>
            </h5>
            <div className="card-body mx-auto">
              <img
                className="card-img-top rounded mx-auto mt-2 profile-picture"
                onLoad={() => this.setState({ imageLoading: false })}
                src={this.state.imageUrl}
                style={this.state.imageLoading ? null : { display: "block" }}
              ></img>
              {this.state.imageLoading ? (
                <div className="spinner-border mx-auto spinner"></div>
              ) : null}
            </div>
            <hr />
            <div className="card-body">
              <div className="p-2 mr-2">{this.state.description}</div>
            </div>
            <div className="card-footer text-muted text-center text-capitalize">
              {this.state.role}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default UserCard;
