import React from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
  return (
    <div className='register'>
      <div className='form-container'>
        <form>
          <div className='form-input'>
            <label htmlFor='firstname'>First Name</label>
            <input type='text' placeholder='John' />
          </div>
          <div className='form-input'>
            <label htmlFor='lastname'>Last Name</label>
            <input type='text' placeholder='Doe' />
          </div>
          <div className='form-input'>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='john@email.com' />
          </div>
          <div className='form-input'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Password' />
          </div>
          <div className='form-input'>
            <label htmlFor='password2'>Confirm Password</label>
            <input type='password' placeholder='Confirm password' />
          </div>
          <button>Sign Up</button>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='register-link'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
