import React from 'react';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { addMovie } from '../slices/myMoviesSlice';
import { useDispatch } from 'react-redux';

const searchResults = (props) => {
  const poster = 'https://image.tmdb.org/t/p/w92' + `${props.poster}`;

  const dispatch = useDispatch();
  const handleAddMovie = () => {
    dispatch(addMovie(props.movie));
  };
  return (
    <div className='movie-result'>
      <img className='movie-card' src={poster} />
      <span>{props.title}</span>
      <div className='review-buttons'>
        <Tooltip title='To Watch' placement='right-start'>
          <IconButton
            onClick={() =>
              dispatch(addMovie({ movieId: props.movieId, watched: false }))
            }
            variant='contained'
            color='primary'
            className='button-search'
            size='large'
          >
            <BookmarkAddIcon />
          </IconButton>
        </Tooltip>
        <br />
        <Tooltip title='Watched' placement='right-start'>
          <IconButton
            onClick={() =>
              dispatch(addMovie({ movieId: props.movieId, watched: true }))
            }
            color='primary'
            variant='contained'
            className='button-search'
            size='large'
          >
            <BookmarkAddedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default searchResults;
