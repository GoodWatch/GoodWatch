import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addReview } from '../slices/myMoviesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMovie } from '../slices/myMoviesSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const MovieCardWatched = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const poster = `https://image.tmdb.org/t/p/w92${props.poster}`;
  const [open, setOpen] = useState(false);
  const [comment, setcomment] = useState('');
  const [rating, setRating] = useState(2);

  const trimYear = (releaseYear) => releaseYear.slice(0, 4);

  const handleReviewInput = (event) => {
    setcomment(event.target.value);
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
      <div>
        {/* <div> add className */}
        {props.title} ({trimYear(props.year)})
        <br />
        <Rating
          name='size-small'
          defaultValue={props.rating}
          size='small'
          readOnly
        />
        <br />
        {props.review}
      </div>
      <Stack direction='column' spacing={1}>
        <IconButton
          onClick={() => {
            dispatch(deleteMovie({ movieId: props.movieId }));
          }}
          variant='contained'
          color='primary'
          className='button-search'
          size='large'
        >
          <DeleteIcon />
        </IconButton>
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
              value={comment}
              style={{ width: '100%' }}
              multiline
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(
                addReview({
                  movieId: props.movieId,
                  comment: comment,
                  rating: rating,
                })
              );
              console.log('comment', typeof comment);
              setOpen(false);
            }}
            variant='contained'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieCardWatched;
