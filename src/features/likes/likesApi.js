import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['likes'],
  endpoints: (builder) => ({
    getLikesPost: builder.query({
      query: (postId) => '/likes?postId=' + postId,
      providesTags: ['likes'],
    }),
    addLike: builder.mutation({
      query: (postId) => ({
        url: '/likes',
        method: 'POST',
        body: postId,
      }),
      invalidatesTags: ['likes'],
    }),
    deleteLike: builder.mutation({
      query: (postId) => ({
        url: '/likes',
        method: 'DELETE',
        body: postId,
      }),
      invalidatesTags: ['likes'],
    }),
  }),
});

export const {
  useGetLikesPostQuery,
  useAddLikeMutation,
  useDeleteLikeMutation,
} = likesApi;
