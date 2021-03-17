import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { ApiContext } from '../context/ApiContext';
import { Button } from '@material-ui/core';

const ProfileIcon = ({ userImg }) => {
  const { user, profile, setSelectedProfile, setSelectedUser } = useContext(ApiContext);
  const CheckUserProfile = (userId, profId) => {
    setSelectedProfile(profId);
    setSelectedUser(userId);
  };
  return (
    <Button size="small" className="Icon" onClick={() => CheckUserProfile(user.id, profile.id)} style={{ flex: 1 }}>
      <Avatar alt="profile icon" src={userImg} />
    </Button>
  );
};

export default ProfileIcon;
