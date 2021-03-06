import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Grid from '@material-ui/core/Grid';
import { GoMail } from 'react-icons/go';
import { BsFillPeopleFill } from 'react-icons/bs';
import Profile from './Profile';
import Ask from './Ask';
import InboxDM from './InboxDM';
import UserInfo from './UserInfo';

const Main = () => {
  const { users, profiles, profile, askList, askListFull, inbox } = useContext(ApiContext);
  const filterProfiles = profiles.filter((prof) => {
    return prof.id !== profile.id;
  });
  // const getUser = (filprof) => {
  //   const user = users.filter((user) => {
  //     return user.id === filprof.id;
  //   });
  //   return user[0];
  //   // console.log(user[0]);
  // };

  // const con = () => {
  //   users.find((user) => {
  //     return user.email === filprof.userPro;
  //   });
  // };
  const listProfiles =
    filterProfiles &&
    filterProfiles.map((filprof) => (
      <Profile
        key={filprof.id}
        userData={users.find((user) => {
          return user.id === filprof.userPro;
        })}
        profileData={filprof}
        askData={askListFull.filter((ask) => {
          return (filprof.userPro === ask.askFrom) | (filprof.userPro === ask.askTo);
        })}
      />
    ));
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-details">
          <UserInfo />
        </div>
        <h3 className="title-ask">
          {' '}
          <BsFillPeopleFill className="badge" />
          友達リクエスト
        </h3>
        <div className="app-details">
          <div className="task-list">
            <ul>
              {profile.id &&
                askList.map((ask) => (
                  <Ask
                    key={ask.id}
                    ask={ask}
                    prof={profiles.filter((item) => {
                      return item.userPro === ask.askFrom;
                    })}
                  />
                ))}
            </ul>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">{listProfiles}</div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3>
          <GoMail className="badge" />
          DM
        </h3>
        <div className="app-dms">
          <div className="task-list">
            <ul>
              {profile.id &&
                inbox.map((dm) => (
                  <InboxDM
                    key={dm.id}
                    dm={dm}
                    prof={profiles.filter((item) => {
                      return item.userPro === dm.sender;
                    })}
                  />
                ))}
            </ul>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
