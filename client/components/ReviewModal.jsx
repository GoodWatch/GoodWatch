import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';

const ReviewModal = () => {
  const [review, setReview] = useState('');

  const handleReviewInput = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className='review-modal'>
      <h2>Write a review</h2>
      <form>
        <span>
          <h3>Rating: </h3>
          <select name='selectList' id='selectlist'>
            <option value='option 1'>0</option>
            <option value='option 2'>1</option>
            <option value='option 3'>2</option>
            <option value='option 4'>3</option>
            <option value='option 5'>4</option>
            <option value='option 6'>5</option>
          </select>
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
        </span>
      </form>
    </div>
  );
};

export default ReviewModal;
