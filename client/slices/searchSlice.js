import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

const initialSearchState = {
  displayResults: [],
  pageNumber: 1
};

export const showResults = createAsyncThunk(
  '/searchResults', // <- need endpoint name from backend
  async() => {
    try {
      const response = await axios.post('/search/', {
        index: initialSearchState.pageNumber
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const searchReducer = createSlice({
  name: 'searches',
  initialState: initialSearchState,
  reducers: {
    setSearchResults: (state, action) => {
      state.displayResults = action.payload;
    },
    incrementPageNumber: (state) => {
      state.pageNumber += 1; // <- redundant with extraReducers - might remove
    }
  },
  extraReducers: (builder) => {
    builder.addCase(showResults.fulfilled, (state) => {
      state.pageNumber += 1;
    });
  },
});

export const searchActions = searchReducer.actions;

export default searchReducer.reducer;
