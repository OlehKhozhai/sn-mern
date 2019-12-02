import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "redux/auth/authSelectors";
import { useSelector } from "react-redux";

const PrivateRoutes: React.FC<any> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(getToken);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoutes;
