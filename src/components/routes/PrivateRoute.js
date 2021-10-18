import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.node,
};

export default PrivateRoute;
