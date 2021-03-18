import React, { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#8d69af',
    filter: 'blur(10px)',
  },
  profIcon: {
    height: '128px',
    width: '128px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const ProfileInfo = () => {
  const {
    user,
    profile,
    showUser,
    showProfile,
    setShowProfile,
    editProfile,
    editUserInfo,
    setShowUser,
    setSelectedUser,
    getSpecificUserProfileInfo,
  } = useContext(ApiContext);

  const [profileEditing, setProfileEditing] = useState(false);
  const [userEditing, setUserEditing] = useState(false);

  // const [personality, setPersonality] = useState('');

  const updateShowProfile = () => (event) => {
    setShowProfile({
      ...showProfile,
      personality: event.target.value,
    });
  };

  const updateMyUser = () => (event) => {
    switch (event.target.name) {
      case 'username':
        setShowUser({ ...showUser, username: event.target.value });
        break;
      case 'userAge':
        setShowUser({ ...showUser, age: event.target.value });
        break;
      default:
        console.log('key not found');
    }
  };

  const saveEditProfile = () => {
    if (editProfile()) {
      setProfileEditing(false);
    } else {
      console.log('保存に失敗');
    }
  };

  const saveEditUser = () => {
    if (editUserInfo()) {
      setUserEditing(false);
    } else {
      console.log('保存に失敗');
    }
  };

  const classes = useStyles();
  return (
    <>
      <Container style={{ marginTop: '20px' }} maxWidth="md">
        <Grid container spacing={4} style={{ flexDirection: 'row' }} alignItems="center">
          <Grid item xs={2}>
            <Avatar className={classes.profIcon} alt="profile icon" src={showUser.img} />
          </Grid>

          <Grid item xs={7}>
            {userEditing ? (
              <>
                <TextField
                  style={{ marginBottom: '2%' }}
                  label="編集"
                  name="username"
                  value={showUser.username}
                  onChange={updateMyUser()}
                />
                <br />
                <TextField label="編集" name="userAge" value={showUser.age} onChange={updateMyUser()} />
                <Button variant="contained" color="primary" onClick={() => saveEditUser()}>
                  保存する
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5">{showUser.username}</Typography>
                <Typography variant="h6">{showUser.age}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={3}>
            {user.id === showUser.id ? (
              <Button size="large" variant="contained" color="secondary" onClick={() => setUserEditing(!userEditing)}>
                編集する
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => setProfileEditing(!profileEditing)}
              >
                編集する
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container style={{ flexDirection: 'row', marginTop: '30px' }}>
          <Grid container>
            <Typography style={{ marginTop: '30px' }} variant="h4">
              パーソナリティー
            </Typography>
          </Grid>
          <form className={classes.form} noValidate>
            <Grid container>
              {profileEditing ? (
                <>
                  <TextField
                    style={{ width: '100%', marginBottom: '5%' }}
                    label="編集"
                    multiline
                    rows={20}
                    value={showProfile.personality}
                    onChange={updateShowProfile()}
                  />
                  <Button variant="contained" color="primary" onClick={() => saveEditProfile()}>
                    保存する
                  </Button>
                </>
              ) : (
                <Typography style={{ marginTop: '30px' }} variant="h6">
                  {showProfile.personality}
                </Typography>
              )}
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
