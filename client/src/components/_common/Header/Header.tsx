import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, getToken } from 'redux/auth/authSelectors';
import { logoutAction } from 'redux/auth/authActions';
import Logo from 'assets/img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import style from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getToken);
  const user = useSelector(getUser);

  const logout = () => dispatch(logoutAction());

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

              <li>{/*<img src={user.avatar} alt="avatar" />*/}</li>

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

export default Header;
