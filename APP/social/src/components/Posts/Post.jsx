import React from 'react';
import './Post.css';

export default function Post() {
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImg' src='/assets/me.jpg' alt ='' />
                    <span className="postUsername">Joseph Parkinson</span>
                    <span className="postDate">4 minutes ago</span>
                </div>
                <div className="postTopRight">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">
                    Hey! I hope this works!
                    <img className='postImg' src='assets/Post1.jpg' alt='' />
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
                        32 people like this!
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
