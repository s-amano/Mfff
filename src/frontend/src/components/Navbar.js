import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';
import LogoutButton from './LogoutButton';
import ProfileIcon from './ProfileIcon';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const { user } = useContext(ApiContext);

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/profiles" style={{ textDecoration: 'none', color: 'white' }}>
            Make friends with friends of friends!!
          </Link>
        </Typography>

        <LogoutButton />
        <ProfileIcon userImg={user.img} />
      </Toolbar>
    </AppBar>
  );
};

export default withCookies(Navbar);
