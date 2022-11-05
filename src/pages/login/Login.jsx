import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../features/auth/authSlice';

import axios from 'axios';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginRequest, loginSuccess, loginFail } = authActions;
  const { loading, user, error } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      const res = await axios.post(
        'http://localhost:8800/api/auth/login',
        inputs,
        { withCredentials: true }
      );
      console.log(res);
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (err) {
      dispatch(loginFail(err.response.data));
      console.log('err : ', err);
    }
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
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={loading ? true : false}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
