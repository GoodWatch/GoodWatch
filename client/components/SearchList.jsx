import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardSearched from './MovieCardSearched';
import { CircularProgress } from '@mui/material';

const Search = ({ searchTerm }) => {
  const searchResults = useSelector((state) => {
    return state.searchResults.displayResults;
  });

  const searchedMovieList = [];
  // console.log('searchResults', searchResults);
  searchResults.forEach((movie, i) => {
    searchedMovieList.push(
      <div>
        <MovieCardSearched
          key={i}
          movie={movie}
          movieId={movie.id}
          title={movie.original_title}
          year={movie.release_date}
          poster={movie.poster_path}
        />
        <br />
      </div>
    );
  });
  return (
    <div className='search-list'>
      {searchedMovieList}
      {/* <CircularProgress /> */}
    </div>
  );
};

export default Search;
