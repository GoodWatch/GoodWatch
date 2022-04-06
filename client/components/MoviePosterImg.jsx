import React from 'react';
import { useNavigate } from 'react-router-dom';
import MoviePosterFallback from '../Public/MoviePosterFallback.png';

const MoviePosterImg = ({ src, movieId, ...rest }) => {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate(`/movie/${movieId}`)}
      className='movie-card-pic'
      src={src}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = MoviePosterFallback;
      }}
      {...rest}
    />
  );
};

export default MoviePosterImg;
