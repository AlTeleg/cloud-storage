import React, { useState } from 'react';
import Api from '../../services/api';
import { useNavigate } from "react-router-dom";
import NavigationMenu from './NavigationMenu'
import store from '../../reducers/authReducer'

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      const response = await Api.logoutUser();
      if (response.ok) {
        setLogoutMessage(message);
        store.dispatch({ type: 'LOGOUT' });
        setTimeout(() => {
            navigate('/');
        }, 2000);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
      {logoutMessage && <p>{logoutMessage}</p>}
      {error && <p>{error}</p>}
      <hr/ >
      <p>Are you sure you want to logout from your storage?</p>
      <button onClick={handleLogout}>Confirm</button>
    </div>
  );
};

export default Logout;
