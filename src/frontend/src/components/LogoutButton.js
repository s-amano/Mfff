import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';

const LogoutButton = (props) => {
  const Logout = () => (event) => {
    props.cookies.remove('current-token');
    window.location.href = '/';
  };
  return (
    <button className="Icon" onClick={Logout()}>
      <FiLogOut />
    </button>
  );
};

export default withCookies(LogoutButton);
