import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const UserInfoEdit = ({ editedProfile }) => {
  return (
    <Grid container>
      <Card style={{ width: '100%' }}>
        <CardContent style={{ padding: 5 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {editedProfile.nickName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {editedProfile.personality}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserInfoEdit;
