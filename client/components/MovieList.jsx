import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardWatched from './MovieCardWatched';

const MovieList = (props) => {
  const myMovies = useSelector((state) => {
    /*
    useEffect(() => {

    })
    */
    return state.myMovies.myMoviesList;
  });

  console.log('myMovies is: ', myMovies);

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

  return <div className='movie-list'>{feedItems}</div>;
};

export default MovieList;
