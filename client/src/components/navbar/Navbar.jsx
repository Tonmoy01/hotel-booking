import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../context/authContext';

import './navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='nav-container'>
        <Link to='/'>
          <span className='logo'>
            <img src={logo} alt='logo' height={'70px'} width={'100px'} />
          </span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className='nav-items'>
            <button className='nav-button'>Register</button>
            <button className='nav-button'>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
