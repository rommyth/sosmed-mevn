import React from 'react';
import './posts.scss';
import { posts } from './data';
import Post from '../post/Post';

export default function Posts() {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
