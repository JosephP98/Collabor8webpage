import React from 'react';
import './Share.css'

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
                <div className="shareOption">
                    <i class="fas fa-photo-video"></i>
                    <span className='shareOptionText'>Photo or Video</span>
                </div>
            </div>
        </div>
    </div>
  );
}
