import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from './NavigationMenu'
import store from '../../reducers/authReducer'

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await Api.loginUser(formData);
      navigate('/files');
      store.dispatch({ type: 'LOGIN' });
    } catch (error) {
    setError('Invalid username or password.');
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
