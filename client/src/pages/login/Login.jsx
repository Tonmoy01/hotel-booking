import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const res = await axios.post('/auth/login', credentials);

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });

      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <input
          type='text'
          placeholder='username'
          id='username'
          onChange={handleChange}
          className='login-input'
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className='login-input'
        />
        <button
          disabled={loading}
          onClick={handleLogin}
          className='login-button'
        >
          Login
        </button>
        {error && <span className='error'>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
