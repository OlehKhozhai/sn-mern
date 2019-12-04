import React from "react";
import style from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => (
  <div className={style.root}>
    <h3>Developer Connector</h3>
    <div>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default Home;
