import React from 'react';
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import MovieList from './MovieList';
import { useDispatch } from 'react-redux';

const MovieContainer = () => {
  const dispatch = useDispatch();
  const [watched, setWatchedState] = useState(true);

  const [alignment, setAlignment] = useState('watched');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClick = () => {
    setWatchedState((cur) => !cur);
  };
  return (
    <div className='movie-container' role ='movie-container'>
      <h2>
        My Movies
      </h2>
      <div className='movie-list-buttons'>
        <span>
          <ToggleButtonGroup
            color='primary'
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              sx={{ fontWeight: 'bolder' }}
              value='watched'
              onClick={() => {
                if (!watched) handleClick();
              }}
            >
              Watched
            </ToggleButton>
            <ToggleButton
              sx={{ fontWeight: 'bolder' }}
              value='to-watch'
              onClick={() => {
                if (watched) handleClick();
              }}
            >
              To Watch
            </ToggleButton>
          </ToggleButtonGroup>
        </span>
      </div>
      <MovieList watched={watched} />
    </div>
  );
};

export default MovieContainer;
