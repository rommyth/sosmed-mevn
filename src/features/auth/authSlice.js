import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = {};
      localStorage.removeItem('user');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
