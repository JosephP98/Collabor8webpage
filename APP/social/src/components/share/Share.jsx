import React from 'react';
import './Share.css'

<<<<<<< Updated upstream
=======
// send post to db
function post(e) {
    const cap = document.getElementsByClassName("shareInput")[0];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: 0, path: "https://picsum.photos/200", author: "joe", caption: cap.value})
    };
    fetch('http://localhost:3001/api/db/post/new/demo', requestOptions)
        .then(response => console.log(response.json()));
}
>>>>>>> Stashed changes
export default function Share() {
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src='/assets/me.jpg' alt=''/>
                <input placeholder='Share something you have made Joe!' className='shareInput' />    
            </div>
            <hr className='shareHr'/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <div className="shareIcon">
                            <i class="fas fa-photo-video"></i>
                        </div>
                        <span className='shareOptionText'>Photo or Video</span>
                    </div>

                    <div className="shareOption">
                        <div className="shareIcon">
                            <i class="fas fa-music"></i>
                        </div>
                        <span className='shareOptionText'>Music</span>
                    </div>

                    <div className="shareOption">
                        <div className="shareIcon">
                            <i class="fas fa-microphone-alt"></i>
                        </div>
                        <span className='shareOptionText'>Voice</span>
                    </div>

                    <div className="shareOption">
                        <div className="shareIcon">
                            <i class="fas fa-video"></i>
                        </div>
                        <span className='shareOptionText'>Go Live</span>
                    </div>
                </div>
<<<<<<< Updated upstream
                <button className='shareButton'>
=======
                  <button className='shareButton'>
>>>>>>> Stashed changes
                    Share
                </button>
            </div>
        </div>
    </div>
  );
}
