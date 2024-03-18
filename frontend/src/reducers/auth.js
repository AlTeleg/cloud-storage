import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = auth.actions;
export default auth.reducer;
