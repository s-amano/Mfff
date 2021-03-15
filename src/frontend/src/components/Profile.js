import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Profile = ({ profileData, userData, askData, setSpecificProfile }) => {
  const classes = useStyles();
  const { newRequestFriend, profile, getSpecificProfile } = useContext(ApiContext);

  const newRequest = () => {
    const askUploadData = new FormData();
    askUploadData.append('askTo', profileData.userPro);
    newRequestFriend(askUploadData);
  };

  return (
    <Grid xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        {userData.img ? (
          <CardMedia style={{ minWidth: 100, flex: 3 }} image={userData.img} />
        ) : (
          <CardMedia style={{ minWidth: 100, flex: 3 }} image="http://127.0.0.1:8000/media/image/null.png" />
        )}

        <CardContent style={{ padding: 5, flex: 4 }}>
          <Typography variant="h6">{profileData.nickName}</Typography>
          <Typography>{profileData.created_on}</Typography>
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
        </CardContent>

        <Button
          size="small"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => getSpecificProfile(profileData.id)}
          style={{ flex: 1 }}
        >
          プロフィール
        </Button>
      </Card>
    </Grid>
  );
};

export default Profile;
