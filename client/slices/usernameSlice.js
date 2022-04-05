import { createSlice } from '@reduxjs/toolkit';

const initialUsernameState = {
  username: [],
};

export const usernameSlice = createSlice({
  name: 'username',
  initialUsernameState,
  reducers: {},
});

export const { addMovie, deleteMovie } = usernameSlice.actions;

export default usernameSlice.reducer;
