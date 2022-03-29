import React, { useState, useEffect, Component } from 'react';
import "./Feed.css";
import Share from '../share/Share';
import Post from '../Posts/Post';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  let temp;
  useEffect(() => {
    fetch('http://localhost:3001/api/db/post/all', { method: 'GET', mode: 'cors' })
      .then(res => res.json())
      .then(res => {
        temp = res.map(data => {
          return React.createElement(Post, { author: data.author, caption: data.caption !== null ? data.caption : "", path: data.path, likes: data.likes });
        });

        setPosts(temp);
      });
}, []);
  
  return (
    <div className='feed'>
      <div className="feedWrapper">
          <Share />
        <div>{ posts }</div>
      </div>
    </div>);
}
