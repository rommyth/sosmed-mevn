import React from 'react';
import './comments.scss';
import { comments } from './data';
import { useSelector } from 'react-redux';
export default function Comments() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilPict} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
}
