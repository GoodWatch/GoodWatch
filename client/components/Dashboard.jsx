import React from 'react';
import SearchWindow from './SearchWindow';
import MovieList from './MovieList';
import ReviewModal from './ReviewModal';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h2>Dashboard Header</h2>
      </div>
      <MovieList />
      <SearchWindow />
      <ReviewModal />
    </div>
  );
};

export default Dashboard;
