import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfileAction } from 'redux/profile/ptofileActions';

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  return <div>Profile</div>;
};

export default Profile;
