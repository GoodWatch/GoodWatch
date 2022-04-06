import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Box, Typography, IconButton } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMovieRecs, addMovie } from '../slices/myMoviesSlice';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import MoviePosterImg from './MoviePosterImg';

const RecommendMovies = () => {
  const dispatch = useDispatch();
  const recommendedMovies = useSelector(
    (state) => state.myMovies.recommendedMovies
  );

  useEffect(() => {
    dispatch(getMovieRecs());
  }, []);

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
        <IconButton
          size='small'
          sx={{ padding: 0 }}
          onClick={() => dispatch(getMovieRecs())}
        >
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
        {recommendedMovies.map((cur,i) => (
          <Box key={i}>
            <MoviePosterImg
              src={`https://image.tmdb.org/t/p/w92${cur.poster_path}`}
              movieId={cur.id}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                transform: 'translate(0,-40px);',
              }}
            >
              <Tooltip title='To Watch' placement='top'>
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
              <Tooltip title='Watched' placement='top'>
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
