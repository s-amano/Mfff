import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const token = props.cookies.get('current-token');
  const [users, setUsers] = useState([]);
  // 自分のuser情報
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [profile, setProfile] = useState([]);
  // 特定のユーザーのプロフィール
  const [selectedProfile, setSelectedProfile] = useState();
  const [profiles, setProfiles] = useState([]);
  // 自分宛の友達申請リスト
  const [askList, setAskList] = useState([]);
  // 自分宛、他人宛の友達申請リスト
  const [askListFull, setAskListFull] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [cover, setCover] = useState([]);
  const [showProfile, setShowProfile] = useState({});
  const [showUser, setShowUser] = useState({});

  useEffect(() => {
    console.log('effect');
    let mounted = true;

    // 自分のユーザー情報を取得
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user/myuser/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        res.data[0] && setUser(res.data[0]);
        // res.data[0] &&
        // setEditedUser({
        //   id: res.data[0].id,
        //   username: res.data[0].username,
        //   img: res.data[0].img,
        //   age: res.data[0].age,
        // });
      } catch {
        console.log('error');
      }
    };

    // 自分のプロフィールと友達申請リストを取得
    const getMyProfile = async () => {
      try {
        const resmy = await axios.get('http://localhost:8000/api/user/myprofile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const res = await axios.get('http://localhost:8000/api/user/approval/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (mounted) {
          resmy.data[0] && setProfile(resmy.data[0]);
          // プロフィール詳細の初期値
          resmy.data[0] &&
            // setEditedProfile({
            //   id: resmy.data[0].id,
            //   nickName: resmy.data[0].nickName,
            //   personality: resmy.data[0].personality,
            // });
            resmy.data[0] &&
            setAskList(
              res.data.filter((ask) => {
                return resmy.data[0].userPro === ask.askTo;
              })
            );

          setAskListFull(res.data);
        }
      } catch {
        console.log('error');
      }
    };

    // DBにある全てのユーザーリスト取得→友達の友達のみに絞りたい
    const getUserList = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/user/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (mounted) {
          setUsers(res.data);
        }
      } catch {
        console.log('users error');
      }
    };

    // DBにある全てのプロフィールリスト取得→友達の友達のみに絞りたい
    const getProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (mounted) {
          res.data && setProfiles(res.data);
        }
      } catch {
        console.log('profile error');
      }
    };

    // 自分がreceiverになっているメッセージボックスを取得
    // const getInbox = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:8000/api/dm/inbox/', {
    //       headers: {
    //         Authorization: `Token ${token}`,
    //       },
    //     });
    //     setInbox(res.data);
    //   } catch {
    //     console.log('error');
    //   }
    // };

    // 特定のユーザーのユーザー情報とプロフィールを取得する

    const getSpecificUserProfileInfo = async () => {
      try {
        console.log('user try');
        const resUser = await axios.get(`http://localhost:8000/api/user/user/${selectedUser}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });
        const resPro = await axios.get(`http://localhost:8000/api/user/profile/${selectedProfile}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        if (mounted) {
          setShowProfile(resPro.data);
          setShowUser(resUser.data);
        }
      } catch {
        console.log('error');
      }
    };

    getUserInfo();
    getUserList();
    getMyProfile();
    getProfile();
    getSpecificUserProfileInfo();
    return () => (mounted = false);
  }, [token, selectedUser]);

  // // ユーザー情報を編集する
  // const editUserInfo = async () => {
  //   const editData = new FormData();
  //   editData.append('username', editedUser.username);
  //   editData.append('age', editedUser.age);
  //   cover.name && editData.append('img', cover, cover.name);

  //   try {
  //     const res = await axios.put(`http://localhost:8000/api/user/update/${user.id}/`, editData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setUser(res.data[0]);
  //   } catch {
  //     console.log('error');
  //   }
  // };

  // // プロフィールを作成する
  // const createProfile = async () => {
  //   const createData = new FormData();
  //   createData.append('nickName', editedProfile.nickName);
  //   try {
  //     const res = await axios.post('http://localhost:8000/api/user/profile/', createData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setProfile(res.data);
  //     setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
  //   } catch {
  //     console.log('error');
  //   }
  // };

  // プロフィールを削除する
  const deleteProfile = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/user/profile/${profile.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setProfiles(profiles.filter((dev) => dev.id !== profile.id));
      setProfile([]);
      // setEditedProfile({ id: '', nickName: '' });
      setAskList([]);
    } catch {
      console.log('error');
    }
  };

  // 他人のプロフィールを編集する
  const editProfile = async () => {
    const editData = new FormData();
    editData.append('nickName', showProfile.nickName);
    editData.append('personality', showProfile.personality);
    try {
      const res = await axios.put(`http://localhost:8000/api/user/profile/${showProfile.id}/`, editData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setShowProfile(res.data);
      return true;
    } catch {
      console.log('error');
      return false;
    }
  };

  const newRequestFriend = async (askData) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/user/approval/`, askData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setAskListFull([...askListFull, res.data]);
    } catch {
      console.log('error');
    }
  };

  const sendDMCont = async (uploadDM) => {
    try {
      await axios.post(`http://localhost:8000/api/dm/message/`, uploadDM, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
    } catch {
      console.log('error');
    }
  };

  const changeApprovalRequest = async (uploadDataAsk, ask) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/user/approval/${ask.id}/`, uploadDataAsk, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setAskList(askList.map((item) => (item.id === ask.id ? res.data : item)));

      const newDataAsk = new FormData();
      newDataAsk.append('askTo', ask.askFrom);
      newDataAsk.append('approved', true);

      const newDataAskPut = new FormData();
      newDataAskPut.append('askTo', ask.askFrom);
      newDataAskPut.append('askFrom', ask.askTo);
      newDataAskPut.append('approved', true);

      const resp = askListFull.filter((item) => {
        return item.askFrom === profile.userPro && item.askTo === ask.askFrom;
      });

      !resp[0]
        ? await axios.post(`http://localhost:8000/api/user/approval/`, newDataAsk, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          })
        : await axios.put(`http://localhost:8000/api/user/approval/${resp[0].id}/`, newDataAskPut, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          });
    } catch {
      console.log('error');
    }
  };

  return (
    <ApiContext.Provider
      value={{
        user,
        users,
        profile,
        profiles,
        cover,
        setCover,
        askList,
        askListFull,
        inbox,
        newRequestFriend,
        // createProfile,
        // editProfile,
        deleteProfile,
        changeApprovalRequest,
        sendDMCont,
        // editedProfile,
        // setEditedProfile,
        // editUserInfo,
        // editedUser,
        // setEditedUser,
        // getSpecificProfile,
        // getSpecificUser,
        selectedProfile,
        selectedUser,
        setSelectedProfile,
        setSelectedUser,
        showProfile,
        showUser,
        setShowProfile,
        editProfile,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider);
