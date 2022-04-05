import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

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
          size='large'
          value={searchTerm}
        ></TextField>
      </form>
    </div>
  );
};

export default SearchWindow;
