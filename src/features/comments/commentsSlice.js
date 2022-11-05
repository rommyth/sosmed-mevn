import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getCommentsByPost: builder.query({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: ['comments'],
    }),

    addCommentByPost: builder.mutation({
      query: (post) => ({
        url: '/comments',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['comments'],
    }),
  }),
});

export const { useGetCommentsByPostQuery, useAddCommentByPostMutation } =
  commentsApi;
