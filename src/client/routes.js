import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./pages/landing_page/LandingPage";

import UserDashboard from "./pages/users/UserDashboard";
import User from "./pages/users/User";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/users" component={UserDashboard} />
      <Route exact path="/users/:userId" component={User} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </React.Fragment>
);

export default Routes;