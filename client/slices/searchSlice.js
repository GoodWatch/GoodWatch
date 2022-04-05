import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';
const axios = require('axios');

const initialState = {
  displayResults: [],
  pageNumber: 1,
};

export const showResults = createAsyncThunk(
  '/searchResults', // <- unique string
  async () => {
    try {
      const response = await axios.post('/search/', {
        index: initialState.pageNumber,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const searchReducer = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.displayResults = action.payload;
    },
    incrementPageNumber: (state) => {
      state.pageNumber += 1; // <- redundant with extraReducers - might remove
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showResults.fulfilled, (state) => {
      state.pageNumber += 1;
    });
  },
});

export const searchActions = searchReducer.actions;

export default searchReducer.reducer;
