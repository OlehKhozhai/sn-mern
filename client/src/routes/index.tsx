import SignUp from "components/Auth/SignUp/SignUp";
import React from "react";
import { Switch } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "components/Auth/Login/Login";
import Home from "components/Auth/Home/Home";

const MainRoutes: React.FC = () => (
  <Switch>
    <PrivateRoutes path="/profile" component={Profile} />

    <PublicRoutes path="/sign-up" component={SignUp} />
    <PublicRoutes path="/login" component={Login} />
    <PublicRoutes path="/" component={Home} />
  </Switch>
);

export default MainRoutes;
