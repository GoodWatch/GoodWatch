import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCardWatched from './MovieCardWatched';
import { getMovies } from '../slices/myMoviesSlice.js';
import { Button } from '@mui/material';

const MovieList = (props) => {
  const dispatch = useDispatch();
  const { review, rating } = props;

  const myMovies = useSelector((state) => {
    return state.myMovies.myMoviesList;
  });

  const feedItems = [];

  myMovies.forEach((movie, i) => {
    if (movie.watched == props.watched) {
      feedItems.push(
        <MovieCardWatched
          key={i}
          title={movie.original_title}
          year={movie.release_date}
          poster={movie.poster_path}
          review={movie.comment}
          rating={movie.rating}
          movieId={movie.id}
        />
      );
    }
  });
  return (
    <div className='movie-list'>
      {feedItems}
      <Button sx={{ width: '100%' }} onClick={() => dispatch(getMovies())}>
        Get More
      </Button>
    </div>
  );
};

export default MovieList;
