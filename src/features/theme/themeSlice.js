import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode')
    ? JSON.parse(localStorage.getItem('darkMode'))
    : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeDark: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const appTheme = themeSlice.actions;
export default themeSlice.reducer;
