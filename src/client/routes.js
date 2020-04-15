import React from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./pages/landing_page/LandingPage";

import UserDashboard from "./pages/users/UserDashboard";
import User from "./pages/users/User";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Logout from "./pages/authentication/Logout";

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/users" component={UserDashboard} />
      <Route exact path="/users/:userId" component={User} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </React.Fragment>
);

export default Routes;
