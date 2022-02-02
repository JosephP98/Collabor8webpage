import React from 'react';
import "./Feed.css";
import Share from '../share/Share';
import Post from '../Posts/Post';

export default function Feed() {
  return (
    <div className='feed'>
      <div className="feedWrapper">
          <Share />
          <Post />
          <Post />
          <Post />
          <Post />
      </div>
    </div>);
}
