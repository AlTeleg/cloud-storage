import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationMenu = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(isAuthenticated) && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
      navigate('/login/')
    }
    }, [isAuthenticated]);


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
