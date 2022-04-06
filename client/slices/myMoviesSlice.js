import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';
import axios from 'axios';

const initialState = {
  username: '',
  myMoviesList: [],
  success: false,
  message: null,
};

export const login = createAsyncThunk(
  '/login', // <- unique string
  async ({ username, password }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              success
              message
              data {
                adult
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
                backdrop_path
                homepage
                imdb_id
                revenue
                runtime
                status
                tagline
                rating
                comment
                watched
              }
            }
          }
          `,
          variables: { username, password },
        },
      });
      return response.data.data.login;
    } catch (e) {
      console.log(e);
    }
  }
);

export const myMoviesSlice = createSlice({
  name: 'myMovies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.myMoviesList = state.myMoviesList.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.myMoviesList = state.myMoviesList.filter(
        (movie) => movie != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // TODO: SET USERNAME
      if (action.payload.success) {
        state.myMoviesList = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
      }
    });
  },
});

export const { addMovie, deleteMovie } = myMoviesSlice.actions;

export default myMoviesSlice.reducer;
