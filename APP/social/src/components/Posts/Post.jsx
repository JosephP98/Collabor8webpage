import React from 'react';
import './Post.css';

export default function Post(props) {
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImg' src='/assets/me.jpg' alt ='' />
                      <span className="postUsername">{ props.author }</span>
                    <span className="postDate">4 minutes ago</span>
                </div>
                <div className="postTopRight">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">
                    { props.caption }
                      <img className='postImg' src={ props.path } alt='' />
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
                        9 comments
                    </span>
                </div>
            </div>

        </div>
    </div>
    );
}
