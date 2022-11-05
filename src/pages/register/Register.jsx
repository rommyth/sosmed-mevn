import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    setInputs((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/api/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>KHA World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            eum nesciunt aut magnam praesentium, inventore sequi quibusdam sed
            doloremque cum!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleInput(e)}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
