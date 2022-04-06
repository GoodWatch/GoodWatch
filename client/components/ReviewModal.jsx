import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const ReviewModal = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(2);

  const handleReviewInput = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className='review-modal'>
      <h2>Recommended Movies</h2>
      <form className=''>
        {/* <span>
          <Typography component='legend'>Rating</Typography>
          <Rating
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
          rows={5}
          size='small'
          value={review}
          style={{ width: '90%' }}
          multiline
        ></TextField>
        <span>
          <Button
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
          </Button>
        </span> */}
      </form>
    </div>
  );
};

export default ReviewModal;
