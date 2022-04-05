import React from 'react';

const MovieCardWatched = (props) => {
  const poster = 'https://image.tmdb.org/t/p/w92' + `${props.poster}`;
  return (
    <div className='movie-card-watched'>
      <img className='movie-card-pic' src={poster} />
      <span>{props.title}</span>
    </div>
  );
};

export default MovieCardWatched;
