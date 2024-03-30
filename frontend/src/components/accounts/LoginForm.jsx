import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import { login, logout } from '../../reducers/auth.js';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await Api.loginUser(formData);
      if (response.statusText === "OK") {
        dispatch(login());
        navigate('/home/');
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
