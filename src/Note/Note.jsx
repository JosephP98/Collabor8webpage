import React from 'react';
import './Note.css'

export default function Note() {
  return (
    <div className='Note'>
        <div className="noteWrapper">
            <div className="noteTop">
                <div className="noteTopLeft">
                    <div className="noteDate"> 6 minutes ago</div>
                </div>
                <div className="noteTopRight">
                    <div className="noteTopRightIcon">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
                
            </div>
            <div className="noteBottom">
                <div className="noteText"> bla bla bla</div>
            </div>
        </div>
    </div>);
}
