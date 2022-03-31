import React from 'react';
import "./Sidebar.css";
import {useNavigate} from 'react-router-dom';



export default function Sidebar() {

let navigate = useNavigate();

  return (
  <div className='sidebar'>
      <div className='sidebarWrapper'>
            <ul className='sidebarList'>
                
                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                        <i class="fas fa-rss"/>
                    </div>
                    
                    <span className="sidebarListItemText">Feed</span>

                    
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-inbox" />
                    </div>
                    <span className="sidebarListItemText">Messages</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-fire"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Popular</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                        <i class="fas fa-book"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Library</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-heart"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Favourites</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-palette"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Creations</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-envelope-open-text"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Invites</span>
                </li>

                <li className="sidebarListItem">
                    <div className="sidebarListIcon">
                    <i class="fas fa-question-circle"></i>
                    </div>
                    
                    <span className="sidebarListItemText">Help</span>
                </li>
            </ul>
            <button className='sidebarButton'>Show more</button>
            <hr className="sidebarHr"/>
            <ul className="sidebarFriendList">
                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                    <button onClick={() => {navigate('Draw')}}> click me</button>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>

                <li className="sidebarFriend">
                    <img className='sidebarFriendImg' src="/assets/Jakub.jpg" alt=""/>
                    <span className='sidebarFriendName'>Jakub</span>
                </li>
                
            </ul>
            
      </div>
  </div>
  );
}

