import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import Header from "./_common/Header/Header";
import MainRoutes from "../routes";
import { useDispatch } from "react-redux";
import { refreshUserAction } from "../redux/auth/authActions";

const App: React.FC = ({ history }: any) => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(refreshUserAction()).catch(() => history.push("/"));
  }, [dispatch]);

  return (
    <>
      <Header />
      <MainRoutes />
    </>
  );
};

export default withRouter(App);
