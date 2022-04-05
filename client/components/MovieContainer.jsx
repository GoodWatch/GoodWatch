import React from 'react';
import { useState } from 'react';
import MovieCardWatched from './MovieCardWatched';

const MovieContainer = () => {
  const [watched, setWatchedState] = useState(true);

  const handleClick = () => {
    setWatchedState((prevState) => {
      prevState = !prevState;
      return { ...prevState };
    });
  };
  return (
    <div className='movie-container'>
      <div>
        <h2>My Movies</h2>
        <span>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!watched) handleClick();
            }}
          >
            Watched
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (watched) handleClick();
            }}
          >
            To Watch
          </button>
        </span>
      </div>
    </div>
  );
};

export default MovieContainer;
