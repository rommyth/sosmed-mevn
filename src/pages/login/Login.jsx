import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

import { useDispatch } from 'react-redux';
import { authActions } from '../../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    dispatch(
      authActions.login({
        id: 1,
        name: 'Rommy T',
        email: 'rommy.taufik@example.com',
        profilPict:
          'https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600',
      })
    );
    navigate('/');
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            eum nesciunt aut magnam praesentium, inventore sequi quibusdam sed
            doloremque cum!
          </p>
          <span>Don't you have an account?</span>
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
