import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/dist/query';

// RTK Query Api
import { commentsApi } from '../features/comments/commentsSlice';
import { postsApi } from '../features/posts/postsApi';
import { likesApi } from '../features/likes/likesApi';
import { userApi } from '../features/profile/userApi';
import { relationshipApi } from '../features/profile/relationshipsApi';

// Slice
import themeSlice from '../features/theme/themeSlice';
import authSlice from '../features/auth/authSlice';
import postsSlice from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    posts: postsSlice,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [relationshipApi.reducerPath]: relationshipApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      commentsApi.middleware,
      likesApi.middleware,
      userApi.middleware,
      relationshipApi.middleware
    ),
});

// setupListeners(store.dispatch);
