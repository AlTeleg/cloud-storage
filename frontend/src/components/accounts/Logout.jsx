import React, { useState } from 'react';
import Api from '../../services/api';
import { useNavigate } from "react-router-dom";
import NavigationMenu from './NavigationMenu'
import store from '../../reducers/authReducer'

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const defaultMessage = 'Are you sure you want to logout from your storage?';
  const [message, setMessage] = useState(defaultMessage)
  
  const handleLogout = async () => {
    try {
      const response = await Api.logoutUser();
      if (response.ok) {
        setLogoutMessage(message);
        store.dispatch({ type: 'LOGOUT' });
        setMessage('Good bye! Have a nice day!')
        setTimeout(() => {
            setMessage(defaultMessage)
            navigate('/');
        }, 1500);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  return (
    <>
      <NavigationMenu/ >
      {logoutMessage && <p>{logoutMessage}</p>}
      {error && <p>{error}</p>}
      <hr/ >
      <p>{message}</p>
      <button onClick={handleLogout}>Confirm</button>
    </>
  );
};

export default Logout;
