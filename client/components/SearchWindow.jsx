import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchWindow = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermInput = (event) => {
    setSearchTerm(event.target.value);
  };

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
          style={{ width: '90%' }}
        ></TextField>
        <span>
          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
            variant='contained'
            size='medium'
            color='primary'
            style={{ margin: '10px', fontWeight: 'bold', width: '1%' }}
          >
            <SearchIcon />
          </Button>
        </span>
      </form>
      <div className='search-results'>
        {searchTerm ? `Showing results for ${searchTerm}` : ''}
      </div>
    </div>
  );
};

export default SearchWindow;
