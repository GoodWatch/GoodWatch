import React from 'react';

const searchResults = (props) => {
  const poster = 'https://image.tmdb.org/t/p/w92' + `${props.poster}`;

  return (
    <div className='movie-card-watched'>
      <img className='movie-card' src={poster} />
      <span>{props.title}</span>
    </div>
  );
};

export default searchResults;