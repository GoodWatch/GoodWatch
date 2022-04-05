import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myMoviesList: [],
};

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
});

export const { addMovie, deleteMovie } = myMoviesSlice.actions;

export default myMoviesSlice.reducer;
