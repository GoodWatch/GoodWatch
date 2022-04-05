import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from './SearchList';
import { searchThunk } from '../slices/searchSlice.js';
import { useDispatch } from 'react-redux';

const SearchWindow = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // console.log('search term is: ', searchTerm);

  return (
    <div className='search-window'>
      <h2>Search Window</h2>
      <form>
        <TextField
          onChange={handleSearchTermInput}
          type='text'
          placeholder='Search Movie'
          name='searchTerm'
          size='small'
          value={searchTerm}
          style={{ width: '70%' }}
        ></TextField>
        <span>
          <Button
            onClick={(e) => {
              dispatch(searchThunk(searchTerm));
            }}
            variant='contained'
            size='medium'
            color='primary'
            style={{ margin: '2px', fontWeight: 'bold', width: '1%' }}
          >
            <SearchIcon />
          </Button>
        </span>
      </form>
      <div className='search-results'>
        {searchTerm ? `Showing results for ${searchTerm}:` : ''}
        {searchTerm && <SearchList />}
      </div>
    </div>
  );
};

export default SearchWindow;
