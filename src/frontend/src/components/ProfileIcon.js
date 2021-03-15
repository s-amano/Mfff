import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const ProfileIcon = ({ userImg }) => {
  const CheckProfileInfo = () => (event) => {
    window.location.href = '/profile-info';
  };
  return (
    <button className="Icon" onClick={CheckProfileInfo()}>
      {userImg ? (
        <Avatar alt="profile icon" src={userImg} />
      ) : (
        <Avatar alt="profile icon" src="http://127.0.0.1:8000/media/image/null.png" />
      )}
    </button>
  );
};

export default ProfileIcon;
