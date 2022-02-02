import React from 'react';
import './CreateNote.css'

export default function CreateNote() {
  return (
    <div className='createNote'>
        <div className="createNoteWrapper">
            <div className="createNoteTop">
                <div className="createNoteTopLeft">
                    <div className="createNoteTopText">
                        Create a note 
                    </div>
                </div>
                <div className="createNoteTopRight">
                    <div className="createNoteTopIcon">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>
            <div className="createNoteMiddle">
                <input placeholder='What do you need to note down?' className='shareNoteInput' />    
            </div>
            <div className="createNoteBottom">
                <div className="createNoteBottomIcon">
                     <i class="fas fa-microphone-alt"></i>  
                </div>

                <div className="createNoteBottomText">
                    Create a voicenote
                </div>
            </div>
        </div>
    </div>
  );
}
