import React, { useEffect } from 'react';
import './posts.scss';
// import { posts } from './data';
import Post from '../post/Post';
import axios from 'axios';
import { useState } from 'react';

// Slice
import { fetchPosts } from '../../features/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

// RTK Query
import { useGetPostsQuery } from '../../features/posts/postsApi';

export default function Posts({ userId }) {
  // const dispatch = useDispatch();
  // const { loading, posts, error } = useSelector((state) => state.posts);
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  const { data: posts, isLoading: loading, error } = useGetPostsQuery(userId);

  return (
    <div className="posts">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        posts.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
}
