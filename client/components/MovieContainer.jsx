import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import MovieList from './MovieList';

const MovieContainer = () => {
  const [watched, setWatchedState] = useState(true);

  const handleClick = () => {
    setWatchedState((cur) => !cur);
  };
  return (
    <div className='movie-container'>
      <div>
        <h2>My Movies</h2>
        <span>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              if (!watched) handleClick();
            }}
          >
            Watched
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              if (watched) handleClick();
            }}
          >
            To Watch
          </Button>
        </span>
      </div>
      <MovieList watched={watched} />
    </div>
  );
};

export default MovieContainer;
