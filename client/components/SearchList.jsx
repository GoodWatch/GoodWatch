import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardSearched from './MovieCardSearched';

const Search = (props) => {
  const searchResults = useSelector((state) => {
    return state.searchResults.displayResults;
  });

  const searchedMovieList = [];

  searchResults.forEach((movie, i) => {
    searchedMovieList.push(
      <MovieCardSearched 
        key={i}
        title={movie.original_title} 
        poster={movie.poster_path}
      />
    );
  });
  return <div >{searchedMovieList}</div>;
}

export default Search;