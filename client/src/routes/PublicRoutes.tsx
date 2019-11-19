import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../utils/tokenManager";
import style from "../components/App.module.scss";

const PublicRoutes: React.FC<any> = ({ component: Component, ...rest }) => {
  const isAuthenticated = getToken();

  return (
    <section className={style.container}>
      <Route
        {...rest}
        render={props =>
          !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/profile" />
          )
        }
      />
    </section>
  );
};

export default PublicRoutes;
