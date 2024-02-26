import React, { useState } from 'react';
import { logout } from '../../services/api';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import NavigationMenu from 'NavigationMenu.jsx'

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      response = await logout();
      if response.ok:
        setLogoutMessage(message);
        dispatch({ type: 'LOGOUT' });
        setTimeout(() => {
            navigate('/');
        }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
      {logoutMessage && <p>{logoutMessage}</p>}
      {error && <p>{error}</p>}
      <hr/ >
      <p>Are you sure you want to logout from your storage>?</p>
      <button onClick={handleLogout}>Confirm</button>
    </div>
  );
};

export default Logout;