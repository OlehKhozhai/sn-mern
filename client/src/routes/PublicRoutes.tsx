import React from "react";
import { Redirect, Route } from "react-router-dom";
import style from "../components/App.module.scss";
import { useSelector } from "react-redux";
import { getToken } from "redux/auth/authSelectors";

const PublicRoutes: React.FC<any> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(getToken);

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
