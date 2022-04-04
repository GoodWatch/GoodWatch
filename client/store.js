import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/sampleSlice';
import watchedReducer from './slices/watchedSlice';
import searchReducer from './slices/searchSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    watched: watchedReducer,
  },
});
