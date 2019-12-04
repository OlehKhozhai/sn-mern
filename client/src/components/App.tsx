import React, { useEffect } from 'react';
import { getUser } from 'redux/auth/authSelectors';

import Header from './_common/Header/Header';
import MainRoutes from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserAction } from 'redux/auth/authActions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getUser);

  useEffect(() => {
    dispatch(refreshUserAction());
  }, [dispatch]);
  console.log('isAuthenticated', isAuthenticated);

  if (!isAuthenticated) return null;
  return (
    <>
      <Header />
      <MainRoutes />
    </>
  );
};

export default App;
