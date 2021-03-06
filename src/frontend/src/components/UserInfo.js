import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';

import { BsPersonCheckFill } from 'react-icons/bs';
// import { MdAddAPhoto } from 'react-icons/md';
// import { BsTrash } from 'react-icons/bs';
// import { BsPersonPlus } from 'react-icons/bs';
// import { FaUserEdit } from 'react-icons/fa';
// import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
      margin: 6,
    },
    '& .profile-image': {
      width: 150,
      height: 150,
      ojectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      backgroundColor: 'white',
    },
    '& .profile-details': {
      textAlign: 'center',
      margin: '10px',
      '& span, svg': {
        verticalAlign: 'middle',
        color: 'lightgrey',
        fontFamily: '"Comic Neue", cursive',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 7px 0',
    },
  },
}));

const UserInfo = () => {
  const classes = useStyles();
  const {
    user,
    profile,
    editedProfile,
    setEditedProfile,
    deleteProfile,
    cover,
    setCover,
    createProfile,
    editProfile,
    editUserInfo,
    editedUser,
    setEditedUser,
  } = useContext(ApiContext);

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEditedProfile({ ...editedProfile, [name]: value });
  };
  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        {user.id ? (
          <img src={user.img} alt="user" className="profile-image" />
        ) : (
          <img src="http://127.0.0.1:8000/media/image/null.png" alt="user" className="profile-image" />
        )}
      </div>

      <button className="user" onClick={() => editProfile()}>
        <EditIcon />
      </button>

      <div className="profile-details">
        <BsPersonCheckFill className="badge" /> {user && <span>ユーザー名:{user.username}</span>}
        <hr />
        <BsPersonCheckFill className="badge" /> {profile && <span>ニックネーム:{profile.nickName}</span>}
        <hr />
        <hr />
      </div>
    </div>
  );
};

export default UserInfo;
