import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Grid from '@material-ui/core/Grid';
import { BsFillPeopleFill, BsFillPersonPlusFill } from 'react-icons/bs';
import Profile from './Profile';
import Ask from './Ask';
import InboxDM from './InboxDM';
import UserInfo from './UserInfo';
import UserInfoEdit from './UserInfoEdit';
import Container from '@material-ui/core/Container';

const Main = () => {
  const {
    users,
    profiles,
    profile,
    askList,
    askListFull,
    inbox,
    specificProfile,
    getSpecificProfile,
    getSpecificUser,
    editedProfile,
    editedUser,
  } = useContext(ApiContext);

  const filterProfiles = profiles.filter((prof) => {
    return prof.id !== profile.id;
  });

  const setSpecificUserProfile = (userId, proId) => {
    getSpecificProfile(proId);
    getSpecificUser(userId);
    console.log(editedProfile);
  };

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
        setSpecificProfile={setSpecificUserProfile}
      />
    ));
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {/* <Grid item xs={4}>
        <div className="app-details">
          <UserInfo />
        </div>
        <h3 className="title-ask">
          {' '}
          <BsFillPersonPlusFill className="badge" />
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
      </Grid> */}

        {/* <Grid item xs={4}> */}

        <div className="task-list">{listProfiles}</div>
      </Grid>
      {/* </Grid> */}

      {/* <Grid item xs={4}>
        <h3>
          <BsFillPeopleFill className="badge" />
          プロフィール詳細
        </h3>
        <div className="profile-edit">
          <UserInfoEdit editedProfile={editedProfile} editedUser={editedUser} />
        </div>
      </Grid> */}
    </Container>
  );
};

export default Main;
