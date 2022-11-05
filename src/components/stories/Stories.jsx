import React from 'react';
import './stories.scss';
import { stories } from './data';
import { useSelector } from 'react-redux';

export default function Stories() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="stories">
      <div className="story">
        <img src={user.profilePic} alt="" />
        <span>{user.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}
