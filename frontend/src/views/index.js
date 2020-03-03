import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "../components/register";
import Login from "../components/login";
import Dashboard from "../components/dashboard";
export default () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </Switch>
  );
};

const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        props.location.state && props.location.state.user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
