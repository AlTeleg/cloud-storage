import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationMenu = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <nav className='nav-menu'>
      {isAuthenticated ? (
        <>
          <NavLink to="/logout/">Logout</NavLink>
          <NavLink to="/home/">Home</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login/">Login</NavLink>
          <NavLink to="/register/">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavigationMenu;
