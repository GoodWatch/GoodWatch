import React from 'react';
import SearchWindow from './SearchWindow';
import MovieList from './MovieList';
import ReviewModal from './ReviewModal';

const Dashboard = () => {
  return(
    <>
      <MovieList />
      <SearchWindow />
      <ReviewModal />
    </>
  );
};

export default Dashboard;
