import React from 'react';
import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import './home.scss';
import Share from '../../components/share/Share';

export default function Home() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}
