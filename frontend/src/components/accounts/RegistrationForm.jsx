import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from './NavigationMenu'
import store from '../../reducers/authReducer'

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const { username, email, password, confirmPassword } = formData;
    const errors = {};
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{3,19}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.{6,})/;

    if (!usernameRegex.test(username)) {
      errors.username = 'Username should be 4-20 characters long and can contain only letters and numbers.';
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      errors.password = 'Password should be at least 6 characters long and contain at least one uppercase letter, one digit, and one special character.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateForm()) {
      try {
        delete formData.confirmPassword;
        const response = await Api.registerUser(formData);
        console.log(response)
        console.log(response.ok)
        console.log(response.status)
        if (response.status === 302) {
          store.dispatch({ type: 'LOGIN' });
          navigate('/home/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <NavigationMenu/ >
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        {errors.username && <p>{errors.username}</p>}
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p>{errors.email}</p>}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        {errors.password && <p>{errors.password}</p>}
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegistrationForm;
