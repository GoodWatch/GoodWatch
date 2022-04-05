import React from 'react';
import SearchWindow from './SearchWindow';
import MovieList from './MovieList';
import ReviewModal from './ReviewModal';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <MovieList />
      <SearchWindow />
      <ReviewModal />
    </div>
  );
};

export default Dashboard;
