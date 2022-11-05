import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const relationshipApi = createApi({
  reducerPath: 'relationshipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['relationship'],
  endpoints: (builder) => ({
    getRelationships: builder.query({
      query: (userId) => '/relationships?followedUserId=' + userId,
      providesTags: ['relationship'],
    }),
    addRelationship: builder.mutation({
      query: (userId) => ({
        url: '/relationships',
        method: 'POST',
        body: userId,
      }),
      invalidatesTags: ['relationship'],
    }),
    deleteRelationship: builder.mutation({
      query: (userId) => ({
        url: '/relationships?userId=' + userId,
        method: 'DELETE',
      }),
      invalidatesTags: ['relationship'],
    }),
  }),
});

export const {
  useGetRelationshipsQuery,
  useAddRelationshipMutation,
  useDeleteRelationshipMutation,
} = relationshipApi;
