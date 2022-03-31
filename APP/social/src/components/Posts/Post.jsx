import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './Post.css';

export default function Post(props) {
    const navigate = useNavigate();
    const [img, setImg] = useState();

    useEffect(() => {
        fetch('http://localhost:3001/api/db/collab/' + props.img,
            { method: 'GET', mode: 'cors' })
            .then(res => { return res.json() })
            .then(res => { setImg(res.data) })
            .catch(err => { throw err });
    });

        function contribute() {
        const user_uuid = localStorage.getItem("uuid");
        fetch('http://localhost:3001/api/db/' + props.img + '/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    user_uuid: user_uuid
                })
            })
                .then(response => response.json())
                .then(data => {
                    //console.log('joinning room:' + JSON.stringify(data) + ' user: ' + user_uuid);
                    navigate('/CanvasPage', { state: { uuid: {uuid_v4: props.img } } });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }

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
                  <button onClick={contribute}>Contribute</button>
            </div>

        </div>
    </div>
    );
}
