import React, { createContext, useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const token = props.cookies.get('current-token');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [editedUser, setEditedUser] = useState({ id: '', username: '', age: '' });
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [editedProfile, setEditedProfile] = useState({ id: '', nickName: '' });
  // 自分宛の友達申請リスト
  const [askList, setAskList] = useState([]);
  // 自分宛、他人宛の友達申請リスト
  const [askListFull, setAskListFull] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [cover, setCover] = useState([]);

  useEffect(() => {
    // 自分のユーザー情報を取得
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/user/myuser/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        res.data[0] && setUser(res.data[0]);
        res.data[0] &&
          setEditedUser({
            id: res.data[0].id,
            username: res.data[0].username,
            age: res.data[0].age,
          });
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
        resmy.data[0] && setProfile(resmy.data[0]);
        resmy.data[0] &&
          setAskList(
            res.data.filter((ask) => {
              return resmy.data[0].userPro === ask.askTo;
            })
          );
        setAskListFull(res.data);
      } catch {
        console.log('error');
      }
    };

    // DBにある全てのユーザーリスト取得→友達の友達のみに絞りたい
    const getUserList = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/get/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUsers(res.data);
      } catch {
        console.log('img error');
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
        setProfiles(res.data);
      } catch {
        console.log('profile error');
      }
    };

    // 自分がreceiverになっているメッセージボックスを取得
    const getInbox = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/dm/inbox/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setInbox(res.data);
      } catch {
        console.log('error');
      }
    };
    getUserList();
    getUserInfo();
    getMyProfile();
    getProfile();
    getInbox();
  }, [token, profile.id]);

  // ユーザー情報を編集する
  const editUserInfo = async () => {
    const editData = new FormData();
    editData.append('username', editedUser.username);
    editData.append('age', editedUser.age);
    cover.name && editData.append('img', cover, cover.name);

    try {
      const res = await axios.put(`http://localhost:8000/api/user/update/${user.id}/`, editData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setUser(res.data[0]);
    } catch {
      console.log('error');
    }
  };

  // プロフィールを作成する
  const createProfile = async () => {
    const createData = new FormData();
    createData.append('nickName', editedProfile.nickName);
    // cover.name && createData.append('img', cover, cover.name);
    try {
      const res = await axios.post('http://localhost:8000/api/user/profile/', createData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setProfile(res.data);
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
    } catch {
      console.log('error');
    }
  };

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
      setEditedProfile({ id: '', nickName: '' });
      setAskList([]);
    } catch {
      console.log('error');
    }
  };

  // 他人のプロフィールを編集する
  const editProfile = async () => {
    const editData = new FormData();
    // editData.append('nickName', editedProfile.nickName);
    // cover.name && editData.append('img', cover, cover.name);
    editData.append('personality', editedProfile.nickName);
    try {
      const res = await axios.put(`http://localhost:8000/api/user/profile/${profile.id}/`, editData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setProfile(res.data);
    } catch {
      console.log('error');
    }
  };

  const getSomeoneProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/profile/${profile.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setProfile(res.data);
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName });
    } catch {
      console.log('error');
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
        createProfile,
        editProfile,
        deleteProfile,
        getSomeoneProfile,
        changeApprovalRequest,
        sendDMCont,
        editedProfile,
        setEditedProfile,
        editUserInfo,
        editedUser,
        setEditedUser,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider);
