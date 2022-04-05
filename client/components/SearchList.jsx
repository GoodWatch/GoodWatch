import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardSearched from './MovieCardSearched';

const SearchList = (props) => {
  const searchResults = useSelector((state) => {
    return state.searchResults.displayResults;
  });

  const feedItems = [];

  searchResults.forEach((movie, i) => {
    feedItems.push(
      <MovieCardSearched 
        key={i}
        title={movie.original_title} 
        poster={movie.poster_path}
      />
    );
  });
  return <div >{feedItems}</div>;
}

export default SearchList;