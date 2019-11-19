import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../../assets/img/logo.png";
import { clearToken, getToken } from "../../../utils/tokenManager";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/auth/authSelectors";
import style from "./Header.module.scss";

const Header: React.FC = ({ history }: any) => {
  const isAuthenticated = getToken();
  const user = useSelector(getUser);

  const logout = () => {
    clearToken();
    history.push("/");
  };

  return (
    <header className={style.root}>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>{user.name}</li>

              <li>
                {/*<img src={user.avatar} alt="avatar" />*/}
              </li>

              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign up</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
