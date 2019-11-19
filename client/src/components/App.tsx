import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./layout/Header/Header";
import Login from "./auth/Login/Login";
import SignUp from "./auth/SignUp/SignUp";
import Home from "./layout/Home/Home";
import style from "./App.module.scss";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <section className={style.container}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </section>
  </BrowserRouter>
);

export default App;
