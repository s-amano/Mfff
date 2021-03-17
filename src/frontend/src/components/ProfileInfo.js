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
  const [editing, setEditing] = useState(true);
  // const [personality, setPersonality] = useState('');
  const { user, profile, showUser, showProfile, setShowProfile, editProfile } = useContext(ApiContext);

  const updateShowProfile = () => (event) => {
    setShowProfile({
      ...showProfile,
      personality: event.target.value,
    });
  };

  const saveEditProfile = () => {
    if (editProfile()) {
      setEditing(true);
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
            <Typography variant="h5">{showUser.username}</Typography>
            <Typography variant="h6">{showUser.age}</Typography>
          </Grid>
          <Grid item xs={3}>
            {user.id === showUser.id ? (
              <Button size="large" variant="contained" color="secondary" disabled>
                編集する
              </Button>
            ) : (
              <Button size="large" variant="contained" color="secondary" onClick={() => setEditing(false)}>
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
              {editing ? (
                <Typography style={{ marginTop: '30px' }} variant="h6">
                  {showProfile.personality}
                </Typography>
              ) : (
                <>
                  <TextField
                    style={{ width: '100%' }}
                    label="編集"
                    multiline
                    rows={20}
                    value={showProfile.personality}
                    onChange={updateShowProfile()}
                  />
                  <Button onClick={() => saveEditProfile()}>保存する</Button>
                </>
              )}
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
