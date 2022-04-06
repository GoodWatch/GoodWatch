import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMovieRecs } from '../slices/myMoviesSlice';

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
          <img
            key={cur.id}
            className='movie-card-pic'
            src={`https://image.tmdb.org/t/p/w92${cur.poster_path}`}
          />
        ))}
      </Box>
    </div>
  );
};

export default RecommendMovies;
