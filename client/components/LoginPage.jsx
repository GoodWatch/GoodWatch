import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoodWatchLogo from '../Public/GoodWatchFilled.png';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/usernameSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

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
        password,
      });
      // update store
      // username = setUsername(username);
      // dispatch(setUser(username));
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
    <div className='login-page'>
      <img
        src={GoodWatchLogo}
        alt='goodwatch-logo'
        className='goodwatch-logo'
      />
      <div>
        <Link to='/dashboard'>Dashboard</Link>
      </div>
      <div>
        <form>
          <TextField
            onChange={handleUsernameInput}
            type='text'
            placeholder='username'
            name='user'
            size='small'
            value={username}
          ></TextField>
          <br />
          <TextField
            onChange={handlePasswordInput}
            type='text'
            placeholder='password'
            name='password'
            size='small'
            value={password}
          ></TextField>
          <span>
            <br />
            <Button
              onClick={(e) => {
                e.preventDefault();
                login(username, password);
                setUsername('');
                setPassword('');
              }}
              variant='contained'
              size='small'
              color='secondary'
              className='login-buttons'
            >
              Log in
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                login(username, password);
                setUsername('');
                setPassword('');
              }}
              variant='contained'
              size='small'
              color='secondary'
              className='login-buttons'
            >
              Sign Up
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
