import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from './SearchList';
import { searchThunk } from '../slices/searchSlice.js';
import { useDispatch } from 'react-redux';

const SearchWindow = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSearchFieldInput = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearchTerm = (searchTerm) => {
    if(searchField.trim().length) {
      setSearchTerm(searchField);
      dispatch(searchThunk(searchField));
    }
  };

  return (
    <div className='search-window'>
      <form>
        <TextField
          onChange={handleSearchFieldInput}
          type='text'
          placeholder='Search Movie'
          name='searchField'
          size='small'
          value={searchField}
          style={{ width: '70%' }}
        ></TextField>
        <span>
          <Button
            onClick={handleSearchTerm}
            variant='contained'
            size='medium'
            color='primary'
            style={{ margin: '2px', fontWeight: 'bold', width: '1%' }}
          >
            <SearchIcon />
          </Button>
        </span>
      </form>
      <div>
        {searchTerm ? `Showing results for ${searchTerm}:` : ''}
      </div>
      <div className='search-results'>
        {searchTerm && <SearchList />}
      </div>
    </div>
  );
};

export default SearchWindow;
