import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GoodWatchLogo from '../Public/GoodWatchFilledSmall.png';
import { InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../slices/myMoviesSlice';
import EmailIcon from '@mui/icons-material/Email';

const light = {
  palette: {
    primary: {
      main: '#003385',
    },
    secondary: {
      main: '#fff',
    },
  },
};

const SignupPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.myMovies.success);
  const message = useSelector((state) => state.myMovies.message);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const [status, setStatus] = useState(' ');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard');
    else console.log(message); //Todo: display on screen
  }, [isLoggedIn, message]);

  return (
    <ThemeProvider theme={createTheme(light)}>
      <div className='center-screen'>
        <div className='login-page'>
          <img
            src={GoodWatchLogo}
            alt='goodwatch-logo'
            className='goodwatch-logo'
          />
          {/* <div>
            <Link to='/dashboard'>Dashboard Back Door</Link>
          </div> */}
          <div className='login-form'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(signup({ username, password, email }));
                setUsername('');
                setPassword('');
                setEmail('');
              }}
            >
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
                style={{ margin: '20px', width: '350px' }}
                value={username}
              />
              <TextField
                onChange={handlePasswordInput}
                type='password'
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
                style={{ margin: '20px', width: '350px' }}
              />
              <TextField
                onChange={handleEmailInput}
                type='email'
                color='primary'
                placeholder='email'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                name='email'
                size='small'
                value={email}
                style={{ margin: '20px', width: '350px' }}
              />
              <span>
                <br />
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    style={{ margin: '10px', fontWeight: 'bold' }}
                  >
                    Log in
                  </Button>
                </Link>
                <Button
                  type='submit'
                  variant='contained'
                  size='medium'
                  color='primary'
                  style={{ margin: '10px', fontWeight: 'bold' }}
                >
                  Sign up
                </Button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignupPage;
