import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (userId) => (userId ? `/posts?userId=` + userId : `/posts`),
      providesTags: ['posts'],
    }),

    addPosts: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: '/posts/' + postId,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostsMutation, useDeletePostMutation } =
  postsApi;
