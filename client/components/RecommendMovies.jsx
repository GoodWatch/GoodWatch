import React, { useState } from 'react';
import { Tooltip, Button, Box, Typography, IconButton } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMovieRecs, addMovie } from '../slices/myMoviesSlice';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const RecommendMovies = () => {
  const dispatch = useDispatch();
  const recommendedMovies = useSelector(
    (state) => state.myMovies.recommendedMovies
  );
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(2);

  const handleReviewInput = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className='review-modal'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography>Recommended Movies</Typography>
        <IconButton size='small' onClick={() => dispatch(getMovieRecs())}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {recommendedMovies.map((cur) => (
          <Box key={cur.id}>
            <img
              className='movie-card-pic'
              src={`https://image.tmdb.org/t/p/w92${cur.poster_path}`}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Tooltip title='To Watch' placement='right-start'>
                <IconButton
                  onClick={() =>
                    dispatch(addMovie({ movieId: cur.id, watched: false }))
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
                    dispatch(addMovie({ movieId: cur.id, watched: true }))
                  }
                  color='primary'
                  variant='contained'
                  className='button-search'
                  size='large'
                >
                  <BookmarkAddedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default RecommendMovies;
