import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationMenu = ({ isAuthenticated }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <NavLink to="/logout">Logout</Link>
          <NavLink to="/home">Home</Link>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</Link>
          <NavLink to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavigationMenu;