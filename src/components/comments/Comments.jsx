import React from 'react';
import './comments.scss';
// import { comments } from './data';
import moment from 'moment';

import { useSelector } from 'react-redux';
import {
  useGetCommentsByPostQuery,
  useAddCommentByPostMutation,
} from '../../features/comments/commentsSlice';
import { useState } from 'react';

export default function Comments({ postId }) {
  const [desc, setDesc] = useState('');
  const user = useSelector((state) => state.auth.user);
  const {
    data: comments,
    error,
    isLoading,
  } = useGetCommentsByPostQuery(postId);
  const [addCommentByPost] = useAddCommentByPostMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    addCommentByPost({ desc, postId });
    setDesc('');
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          name="comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Send
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        comments.map((comment) => (
          <div className="comment">
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
}
