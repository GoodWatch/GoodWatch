import React, { useEffect } from 'react';
import SearchWindow from './SearchWindow';
import MovieContainer from './MovieContainer';
import ReviewModal from './ReviewModal';
import GoodWatchLogo from '../Public/GoodWatchLogoWhiteSmall.png';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getMovies, logout } from '../slices/myMoviesSlice';
import { useNavigate } from 'react-router-dom';

const light = {
  palette: {
    primary: {
      main: '#003385',
    },
    secondary: {
      main: '#fff',
    },
    success: {
      main: '#000',
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.myMovies.username);
  const myMoviesList = useSelector((state) => state.myMovies.myMoviesList);
  const success = useSelector((state) => state.myMovies.success);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myMoviesList.length) {
      dispatch(getMovies());
    }
  }, []);

  useEffect(() => {
    if (!success) navigate('/');
  }, [success]);

  return (
    <ThemeProvider theme={createTheme(light)}>
      <div className='dashboard'>
        <div className='dashboard-header' role="header">
          <h2>Hello {name}!</h2>
          <img src={GoodWatchLogo} className='dash-logo' />
          <Button
            size='large'
            variant='contained'
            color='secondary'
            style={{ fontWeight: 'bolder' }}
            onClick={() => dispatch(logout())}
          >
            Sign Out
          </Button>
        </div>
        <MovieContainer  />
        <SearchWindow />
        <ReviewModal />
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
