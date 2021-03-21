import React, { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';
import LogoutButton from './LogoutButton';
import ProfileIcon from './ProfileIcon';
import AskModal from './AskModal';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Modal from 'react-modal';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  bg: {
    marginRight: theme.spacing(1),
  },
}));

const Navbar = (props) => {
  // Modal.setAppElement("#root");
  const { token, user, profile, profiles, users, askList, changeApprovalRequest } = useContext(ApiContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '42%',
      right: 'auto',
      bottom: 'auto',
    },
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      {props.cookies.get('current-token') ? (
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link to="/profiles" style={{ textDecoration: 'none', color: 'white' }}>
              Make friends with friends of friends!!
            </Link>
          </Typography>

          <Link to="/profile-info" style={{ textDecoration: 'none', color: 'white' }}>
            <ProfileIcon userImg={user.img} />
          </Link>

          <Badge
            className={classes.bg}
            badgeContent={
              askList.filter((ask) => {
                return (
                  ask.approved === false &&
                  profiles.filter((item) => {
                    return item.userPro === ask.askFrom;
                  })[0]
                );
              }).length
            }
            color="secondary"
          >
            <NotificationsIcon onClick={() => setModalIsOpen(true)} />
          </Badge>

          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
          >
            <Typography>友達申請</Typography>
            <ul>
              {profile.id &&
                askList.map((ask) => (
                  <AskModal
                    key={ask.id}
                    ask={ask}
                    askFromUser={users.filter((item) => {
                      return item.id === ask.askFrom;
                    })}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                  />
                ))}
            </ul>
          </Modal>
          <LogoutButton />
        </Toolbar>
      ) : (
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Make friends with friends of friends!!
          </Typography>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default withCookies(Navbar);
