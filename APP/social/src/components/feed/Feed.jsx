import React, { useState, useEffect, Component } from 'react';
import "./Feed.css";
import Share from '../share/Share';
import Post from '../Posts/Post';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  let temp;
  useEffect(() => {
    fetch('http://localhost:3001/api/db/feed', { method: 'GET', mode: 'cors' })
      .then(res => res.json())
      .then(res => {
        temp = res.reverse().map(data => {
          return React.createElement(Post, { likes: data.likes, title: data.title !== null ? data.title : "", img: data.img, collabs: data.collabs, key: data.id });
        });

        setPosts(temp);
      });
}, [posts]);
  
  return (
    <div className='feed'>
      <div className="feedWrapper">
          <Share />
        <div>{ posts }</div>
      </div>
    </div>);
}

