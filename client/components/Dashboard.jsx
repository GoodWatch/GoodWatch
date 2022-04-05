import React from 'react';
import SearchWindow from './SearchWindow';
import MovieList from './MovieList';
import ReviewModal from './ReviewModal';

const Dashboard = () => {
  return(
    <>
      <MovieList></MovieList>
      <SearchWindow></SearchWindow>
      <ReviewModal></ReviewModal>
    </>
  );
}


export default Dashboard;
