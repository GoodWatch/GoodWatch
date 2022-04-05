import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardWatched from './MovieCardWatched';

const MovieList = (props) => {
  const myMovies = useSelector((state) => {
    return state.myMovies.myMoviesList;
  });

  const feedItems = [];
  // check movie
  myMovies.filter(movie => movie.watched === props.watched).forEach((movie, i) => {
    feedItems.push(
      <MovieCardWatched 
        key={i} 
        title={movie.original_title} 
        poster={movie.poster_path} 
      />);
  });
  return <div className='movie-list'>{feedItems}</div>;
};

export default MovieList;
