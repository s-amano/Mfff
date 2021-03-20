import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Profile = ({ profileData, userData, askData }) => {
  const classes = useStyles();
  const {
    newRequestFriend,
    profile,
    setSelectedProfile,
    setSelectedUser,
    getSpecificUserProfileInfo,
    getFriendList,
  } = useContext(ApiContext);

  const newRequest = () => {
    const askUploadData = new FormData();
    askUploadData.append('askTo', profileData.userPro);
    console.log(askUploadData);
    console.log(profileData.userPro);
    newRequestFriend(askUploadData);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        {userData && userData.img ? (
          <CardMedia className={classes.cardMedia} image={userData.img} />
        ) : (
          <CardMedia className={classes.cardMedia} image="http://127.0.0.1:8000/media/image/null.png" />
        )}

        <CardContent className={classes.cardContent}>
          <Typography variant="h6">名前: {userData.username}</Typography>
          <Typography>age: {userData.age}</Typography>
        </CardContent>

        <CardActions>
          {!askData[0] && profile.id ? (
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => newRequest()}
            >
              友達申請
            </Button>
          ) : (
            <Button size="small" className={classes.button} variant="contained" color="primary" disabled>
              友達申請
            </Button>
          )}
          <Link to="/profile-info" style={{ textDecoration: 'none' }}>
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => getSpecificUserProfileInfo(userData.id, profileData.id)}
              style={{ flex: 1 }}
            >
              プロフィール
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Profile;
