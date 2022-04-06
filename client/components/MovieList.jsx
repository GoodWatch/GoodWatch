import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCardWatched from './MovieCardWatched';
import { getMovies } from '../slices/myMoviesSlice.js';

const MovieList = (props) => {
  const { review, rating } = props;
  const scrollDebounce = useRef(true);
  const dispatch = useDispatch();

  const myMovies = useSelector((state) => {
    return state.myMovies.myMoviesList;
  });

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 80;
    console.dir(e.target);
    if (bottom && scrollDebounce.current) {
      scrollDebounce.current = false;
      dispatch(getMovies());
      setTimeout(() => (scrollDebounce.current = true), 1000);
    }
  };

  const feedItems = [];

  myMovies
    .forEach((movie, i) => {
      if(movie.watched == props.watched) {
        feedItems.push(
          <MovieCardWatched
            key={i}
            title={movie.original_title}
            year={movie.release_date}
            poster={movie.poster_path}
            review={review}
            rating={rating}
            movieId={movie.id}
          />
        );
      }
    });
  return (
    <div
      className='movie-list'
      // onScroll={handleScroll}
    >
      {feedItems}
    </div>
  );
};

export default MovieList;
