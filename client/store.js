import { configureStore } from '@reduxjs/toolkit';
import myMoviesReducer from './slices/myMoviesSlice';
import searchReducer from './slices/searchSlice';
import usernameReducer from './slices/usernameSlice';

export const store = configureStore({
  reducer: {
    myMovies: myMoviesReducer,
    searchResults: searchReducer,
    username: usernameReducer,
  },
});
