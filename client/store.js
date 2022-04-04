import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/sampleSlice';
import watchedReducer from './slices/watchedSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    watched: watchedReducer,
  },
});
