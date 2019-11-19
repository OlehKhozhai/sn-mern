import React from "react";
import { Switch } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Home from "../components/auth/Home/Home";
import SignUp from "../components/auth/SignUp/SignUp";
import Login from "../components/auth/Login/Login";

const MainRoutes: React.FC = () => (
  <Switch>
    <PrivateRoutes path="/profile" component={Profile} />

    <PublicRoutes path="/sign-up" component={SignUp} />
    <PublicRoutes path="/login" component={Login} />
    <PublicRoutes path="/" component={Home} />
  </Switch>
);

export default MainRoutes;
