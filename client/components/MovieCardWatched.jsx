import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import RateReviewIcon from '@mui/icons-material/RateReview';

const MovieCardWatched = (props) => {
  const poster = 'https://image.tmdb.org/t/p/w92' + `${props.poster}`;
  return (
    <div className='movie-card-watched'>
      <img className='movie-card-pic' src={poster} />
      {props.title}
      <Stack direction='row' spacing={1}>
        <Tooltip title='Write Review' placement='right'>
          <IconButton color='primary'>
            <RateReviewIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
};

export default MovieCardWatched;
