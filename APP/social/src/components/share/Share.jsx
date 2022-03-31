import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './Share.css'

export default function Share() {
    const navigate = useNavigate();
    const [title, setTitle] = useState();

    const submit = () => {
        if (title) {
            const uuid = localStorage.getItem('uuid');
            fetch('http://localhost:3001/api/db/' + uuid + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    room_name: title
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('created:', data);
                    navigate('/CanvasPage', { state: { uuid: data } });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src='/assets/me.jpg' alt=''/>
                <input placeholder='Share something you have made Joe!' className='shareInput' onChange={e => setTitle(e.target.value)}/>    
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
                  <button onClick={submit} className='shareButton'>
                    Create
                </button>
            </div>
        </div>
    </div>
  );
}
