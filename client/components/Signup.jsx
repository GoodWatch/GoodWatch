import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import GoodWatchLogo from '../Public/GoodWatchFilled.png';
import { InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/usernameSlice';

const SignupPage = () => {
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

  const signup = async (username, password) => {
    try {
      const response = await axios.post('/newUser', {
        username,
        password,
      });
      // setting user in store
      dispatch(setUser(username));
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
    <div className='center-screen'>
      <div className='login-page'>
        <img
          src={GoodWatchLogo}
          alt='goodwatch-logo'
          className='goodwatch-logo'
        />
        <div>
          <Link to='/dashboard'>Dashboard Back Door</Link>
        </div>
        <div className='login-form'>
          <form>
            <TextField
              onChange={handleUsernameInput}
              type='text'
              color='primary'
              placeholder='username'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              name='user'
              size='small'
              style={{ margin: '4px', width: '350px' }}
              value={username}
            ></TextField>
            <br />
            <TextField
              onChange={handlePasswordInput}
              type='text'
              color='primary'
              placeholder='password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              name='password'
              size='small'
              value={password}
              style={{ margin: '4px', width: '350px' }}
            ></TextField>
            <br />
            <span>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signup(username, password);
                  setUsername('');
                  setPassword('');
                }}
                variant='contained'
                size='medium'
                color='primary'
                style={{ margin: '10px', fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
