import React, { useEffect, useState } from 'react';
import './Post.css';

export default function Post(props) {
    const [img, setImg] = useState();

    useEffect(() => {
        fetch('http://localhost:3001/api/db/collab/' + props.img,
            { method: 'GET', mode: 'cors' })
            .then(res => { return res.json() })
            .then(res => { setImg(res.data) })
            .catch(err => { throw err });
    });

  return (
      <div id={props.id} className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImg' src='/assets/me.jpg' alt ='' />
                      <span className="postUsername">{ props.title }</span>
                    <span className="postDate">4 minutes ago</span>
                </div>
                <div className="postTopRight">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">
                    { props.caption }
                      <img className='postImg' src= {img} alt='' />
                </span>
            </div>

            <div className="postBottom">
                <div className="postBottomLeft">
                    <div className="postLikeIcon">
                        <i class="fas fa-thumbs-up"></i>
                        
                    </div>
                    <div className="postFavIcon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <span className="postLikeCounter">
                          { props.likes } people like this!
                    </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">
                          { props.collabs } people contributed
                    </span>
                </div>
            </div>

        </div>
    </div>
    );
}
