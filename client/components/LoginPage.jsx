import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const [status, setStatus] = useState(' ');
  const navigate = useNavigate();

  const login = async (username, password) => {

    try {

      const response = await axios.post('/user', {
        username,
        password
      });
      // update state

      navigate.push('/dashboard');

      // .then((userinfo) => {
      // if (userinfo.err) {
      //   console.log('error in login');
      //   setStatus(
      //     'Unable to recognize account. Please check your credentials and try again.'
      //     );
      //     return;
      //   }

    } catch (error) {
      console.log(error);
      setStatus(
        'An error occured on the server. Please check your credentials and try again.'
      );
    }
  };

  return (
    <>
      <div>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </div>
      <div>
        <form>
          <input
            onChange={handleUsernameInput}
            type="text"
            placeholder="username"
            name="user"
            value={username}
          ></input>
          <input
            onChange={handlePasswordInput}
            type="text"
            placeholder="password"
            name="password"
            value={password}
          ></input>
          <span>
            <button
              onClick={(e) => {
                e.preventDefault();
                login(username, password);
                setUsername('');
                setPassword('');
              }}
            > Log in </button>
          </span>
        </form>
      </div>

    </>

  );
};

export default LoginPage;
