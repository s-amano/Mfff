import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
}));

const ProfileInfo = () => {
  const { showUser, showProfile } = useContext(ApiContext);

  const classes = useStyles();
  return (
    <>
      {/* <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <ProfileIcon userImg={'http://127.0.0.1:8000/media/image/null.png'} />
        </Toolbar>
      </AppBar> */}
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
            <Button size="large" variant="contained" color="secondary" disabled>
              編集する
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ flexDirection: 'row', marginTop: '30px' }}>
          <Grid container>
            <Typography style={{ marginTop: '30px' }} variant="h4">
              パーソナリティー
            </Typography>
          </Grid>
          <Grid container>
            <Typography style={{ marginTop: '30px' }} variant="h6">
              {showProfile.personality}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileInfo;
