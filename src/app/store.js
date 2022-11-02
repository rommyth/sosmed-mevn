import { configureStore } from '@reduxjs/toolkit';

import themeSlice from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
  },
});
