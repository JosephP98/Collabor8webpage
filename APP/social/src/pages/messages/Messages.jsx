import React from 'react'
import './Messages.css'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Messages() {
  return (
      <>
      <Topbar/>
      
      <div className='messagesLeft'>
      <Sidebar/>
      </div>
    <div className='messages'>
        <div className='Menu'>
            <div className="chatMenuWrapper"></div>
        </div>
        <div className="chatBox"></div>
        <div className="chatOnline"></div>
    </div>
    </>
      
  );
}
