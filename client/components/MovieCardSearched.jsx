import React from 'react';
import { Button } from '@mui/material';

const searchResults = (props) => {
  const poster = 'https://image.tmdb.org/t/p/w92' + `${props.poster}`;

  return (
    <div className='searched-result'>
      <img className='movie-card' src={poster} />
      <span>{props.title}</span>
      <div className='review-buttons'>
        <Button variant='contained' className='button-search'>To Watch</Button>
        <br />
        <Button variant='contained' className='button-search'>Watched</Button>
      </div>
    </div>
  );
};

export default searchResults;
