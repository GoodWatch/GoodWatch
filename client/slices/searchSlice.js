import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';
import axios from 'axios';

const initialState = {
  displayResults: [],
  pageNumber: 1,
};

export const searchThunk = createAsyncThunk(
  '/searchResults', // <- unique string
  async (searchTerm) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query SearchMovies($searchTerm: String!) {
            searchMovies(searchTerm: $searchTerm) {
              adult
              genre_ids
              id
              original_language
              original_title
              overview
              popularity
              poster_path
              release_date
              title
              video
              vote_average
              vote_count
            }
          }
          `,
          variables: {
            searchTerm: searchTerm,
          },
        },
      });
      // console.log(response.data.data);
      return response.data.data.searchMovies;
    } catch (e) {
      console.log(e);
    }
  }
);

export const searchMoreThunk = createAsyncThunk(
  '/searchMoreResults', // <- unique string
  async (searchTerm, { getState }) => {
    const state = getState();
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query SearchMovies($searchTerm: String!, $pageNum: Int) {
            searchMovies(searchTerm: $searchTerm, pageNum: $pageNum) {
              adult
              genre_ids
              id
              original_language
              original_title
              overview
              popularity
              poster_path
              release_date
              title
              video
              vote_average
              vote_count
            }
          }
          `,
          variables: {
            searchTerm: searchTerm,
            pageNum: state.searchResults.pageNumber,
          },
        },
      });
      return response.data.data.searchMovies;
    } catch (e) {
      console.log('ERROR', e);
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
    builder
      .addCase(searchThunk.fulfilled, (state, action) => {
        state.pageNumber += 1;
        state.displayResults = action.payload;
      })
      .addCase(searchMoreThunk.fulfilled, (state, action) => {
        state.pageNumber += 1;
        state.displayResults.push(...action.payload);
      });
  },
});

export const searchActions = searchReducer.actions;

export default searchReducer.reducer;
