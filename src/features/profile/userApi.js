import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => '/users/find/' + userId,
      providesTags: ['user'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
