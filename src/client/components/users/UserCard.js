import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.21);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

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
          <Card className="card">
            <h5 className="card-header text-capitalize">
              <b>{this.state.name}</b>
            </h5>
            <div className="card-body mx-auto">
              <ProfilePicture
                className="card-img-top rounded mx-auto mt-2 "
                onLoad={() => this.setState({ imageLoading: false })}
                src={this.state.imageUrl}
                style={this.state.imageLoading ? null : { display: "block" }}
              ></ProfilePicture>
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
          </Card>
        </Link>
      </div>
    );
  }
}

export default UserCard;
