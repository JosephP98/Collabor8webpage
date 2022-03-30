import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import Rightbar from '../../components/rightbar/Rightbar';
import './Profile.css'

export default function Profile() {

  
  return (
    <>
        <Topbar />
        <div className="profilePage">
          <div className="profilePageLeft">
            <Sidebar />
          </div>
          
          <Feed />
          <Rightbar/>
          
        </div>
        
        
      
      </>
    );
}