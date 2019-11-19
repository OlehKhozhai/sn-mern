import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../utils/tokenManager";

const PrivateRoutes: React.FC<any> = ({ component: Component, ...rest }) => {
  const isAuthenticated = getToken();
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
