import React from 'react';
import "./Topbar.css";
import {useNavigate} from 'react-router-dom';



export default function Topbar() {

  let navigate = useNavigate();

  return <div className='TopbarContainer'>
      <div className="TopbarLeft">
        <span className="logo">Collabor8</span>
      </div>
      <div className="TopbarCenter">
        <div className="searchbar">
          <i class="fas fa-search" className='searchIcon'></i>
          <input placeholder='Search for creations or posts' className="searchInput" />
        </div>
      </div>
      <div className="TopbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <i class="fas fa-user"></i>
            <span className="topbarIconBadge">
              1
            </span>
          </div>
          <div className="topbarIconItem">
            <i class="fas fa-comment"></i>
            <span className="topbarIconBadge">
              2
            </span>
          </div>
          <div className="topbarIconItem">
            <i class="fas fa-bell"></i>
            <span className="topbarIconBadge">
              1
            </span>
          </div>
        </div>
        <img onClick={() => {navigate('/Profile')}} src="/assets/me.jpg" alt="" className="topbarImg" />
      </div>
      
  </div>;
}
