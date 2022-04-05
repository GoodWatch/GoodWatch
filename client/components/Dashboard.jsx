import React from 'react';
import SearchWindow from './SearchWindow';
import MovieContainer from './MovieContainer';
import ReviewModal from './ReviewModal';
import GoodWatchLogo from '../Public/GoodWatchLogoWhiteSmall.png';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

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

const Dashboard = () => {
  const name = useSelector((state) => {
    // console.log('state is: ', state);
    return state.username.username;
  });
  return (
    <ThemeProvider theme={createTheme(light)}>
      <div className='dashboard'>
        <div className='dashboard-header'>
          <h2>Hello {name}!</h2>
          <img src={GoodWatchLogo} className='dash-logo' />
          <Button
            size='large'
            variant='contained'
            color='secondary'
            style={{ fontWeight: 'bolder' }}
          >
            Sign Out
          </Button>
        </div>
        <MovieContainer />
        <SearchWindow />
        <ReviewModal />
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
