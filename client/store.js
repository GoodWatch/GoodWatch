import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/sampleSlice';
import watchedReducer from './slices/watchedSlice';
import searchReducer from './slices/searchSlice';
import usernameReducer from './slices/usernameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    watched: watchedReducer,
    searches: searchReducer,
    // username: usernameReducer,
  },
});
