import React, { useEffect } from 'react';

import Header from './_common/Header/Header';
import MainRoutes from '../routes';
import { useDispatch } from 'react-redux';
import { refreshUserAction } from 'redux/auth/authActions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <MainRoutes />
    </>
  );
};

export default App;
