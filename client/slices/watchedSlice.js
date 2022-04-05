import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchedList: [],
};

export const watchedSlice = createSlice({
  name: 'watched',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.watchedList = state.watchedList.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.watchedList = state.watchedList.filter(
        (movie) => movie != action.payload
      );
    },
  },
});

export const { addMovie, deleteMovie } = watchedSlice.actions;

export default watchedSlice.reducer;
