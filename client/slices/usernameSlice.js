import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: [],
};

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {},
});

// export const { addMovie, deleteMovie } = usernameSlice.actions;

export default usernameSlice.reducer;
