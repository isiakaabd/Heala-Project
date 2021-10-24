import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to={{ pathname: "/", state: { prevLocation: path } }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  path: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }),
};

export default PrivateRoute;
