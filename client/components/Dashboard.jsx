import React from 'react';
import SearchWindow from './SearchWindow';
import MovieContainer from './MovieContainer';
import ReviewModal from './ReviewModal';
import GoodWatchLogo from '../Public/GoodWatchLogoBlack.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const name = useSelector((state) => {
    // console.log('state is: ', state);
    return state.username.username;
  });
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <span>
          <h2>Hello {name}!</h2>
          <div>
            <img src={GoodWatchLogo} className='dash-logo' />
          </div>
        </span>
      </div>
      <MovieContainer />
      <SearchWindow />
      <ReviewModal />
    </div>
  );
};

export default Dashboard;
