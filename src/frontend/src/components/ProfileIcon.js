import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { ApiContext } from '../context/ApiContext';
import { Button } from '@material-ui/core';

const ProfileIcon = ({ userImg }) => {
  const { user, profile, setSelectedProfile, setSelectedUser, getSpecificUserProfileInfo } = useContext(ApiContext);

  return (
    <Button size="small" className="Icon" onClick={() => getSpecificUserProfileInfo(user.id)} style={{ flex: 1 }}>
      <Avatar alt="profile icon" src={userImg} />
    </Button>
  );
};

export default ProfileIcon;
