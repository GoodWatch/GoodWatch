import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Dialog from '@mui/material/Dialog';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const MovieCardWatched = (props) => {
  const navigate = useNavigate();
  const poster = `https://image.tmdb.org/t/p/w92${props.poster}`;
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(2);

  const handleReviewInput = (event) => {
    setReview(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='movie-card-watched'>
      <img
        onClick={() => navigate(`/movie/${props.movieId}`)}
        className='movie-card-pic'
        src={poster}
      />
      {props.title}
      <Stack direction='row' spacing={1}>
        <Tooltip title='Write Review' placement='right'>
          <IconButton color='primary' onClick={handleClickOpen}>
            <RateReviewIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <form className='review-form'>
            <span>
              <img className='movie-card-pic' src={poster} />
              <Typography component='legend'>Rating</Typography>
              <Rating
                className='rating'
                name='simple-controlled'
                size='large'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </span>
            <TextField
              onChange={handleReviewInput}
              type='text'
              placeholder='Share your review here'
              name='review'
              rows={7}
              size='small'
              value={review}
              style={{ width: '100%' }}
              multiline
            />
            <span>
              {/* <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
                variant='contained'
                size='medium'
                color='primary'
                className='review-button'
                style={{ margin: '2px', fontWeight: 'bold', width: '5%' }}
              >
                <ReviewsIcon />
              </Button> */}
            </span>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleClose} variant='contained'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCardWatched;
