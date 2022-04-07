import React, { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from './SearchList';
import { searchThunk, searchMoreThunk } from '../slices/searchSlice.js';
import { useDispatch } from 'react-redux';

const SearchWindow = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');
  // const [scrollDebounce, setScrollDebounce] = useState(true);
  const scrollDebounce = useRef(true);

  const handleSearchFieldInput = (event) => {
    setSearchField(event.target.value);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 80;
    if (bottom && scrollDebounce.current) {
      scrollDebounce.current = false;
      dispatch(searchMoreThunk(searchTerm));
      setTimeout(() => (scrollDebounce.current = true), 1000);
    }
  };

  const handleSearchTerm = (e) => {
    e.preventDefault();
    if (searchField.trim().length) {
      setSearchTerm(searchField);
      dispatch(searchThunk(searchField));
    }
  };

  return (
    <div className='search-window' role ='search-window'>
      <form onSubmit={handleSearchTerm} role="search-form">
        <TextField
          role="text-field"
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
            role="search-button"
            type='Submit'
            variant='contained'
            size='medium'
            color='primary'
            style={{ margin: '2px', fontWeight: 'bold', width: '1%' }}
          >
            <SearchIcon />
          </Button>
        </span>
      </form>
      <div>{searchTerm ? `Showing results for ${searchTerm}:` : ''}</div>
      <div className='search-results' onScroll={handleScroll}>
        {searchTerm && <SearchList searchTerm={searchTerm} />}
      </div>
    </div>
  );
};

export default SearchWindow;
