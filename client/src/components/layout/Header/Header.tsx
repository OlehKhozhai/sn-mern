import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/logo.png";
import style from "./Header.module.scss";

const Header: React.FC = () => (
  <header className={style.root}>
    <Link to="/">
      <img src={Logo} alt='logo' />
    </Link>
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign up</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
