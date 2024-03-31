import React, { useState } from 'react';
import Api from '../../services/api';
import { useNavigate } from "react-router-dom";
import { logout } from '../../reducers/auth.js';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const defaultMessage = 'Are you sure you want to logout from your storage?';
  const [message, setMessage] = useState(defaultMessage);
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      const response = await Api.logoutUser();
      if (response.statusText === "OK") {
        setLogoutMessage(message);
        dispatch(logout());
        setMessage('Good bye! Have a nice day!')
        setTimeout(() => {
            setMessage(defaultMessage)
            navigate('/');
        }, 1500);
      }
    } catch (e) {
      if (e.response.data.error) {
        setError(e);
      }
      console.error(e);
    }
  };

  return (
    <>
      {logoutMessage && <p>{logoutMessage}</p>}
      {error && <p>{error}</p>}
      <hr/ >
      <p>{message}</p>
      <button onClick={handleLogout}>Confirm</button>
    </>
  );
};

export default Logout;
