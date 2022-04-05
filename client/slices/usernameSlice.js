import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    removeUser: (state, action) => {
      state.username = '';
    },
  },
});

export const { setUser, removeUser } = usernameSlice.actions;

export default usernameSlice.reducer;
