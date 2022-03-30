import React from 'react'
import "./Login.css"
import {useNavigate} from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
  return (
      <>
      <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <div className="loginPicture">Collabor8</div>
                <span className="loginDescription">
                    Create and share with your friends on Collabor8!
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Email Address" className="logintext" />
                    <input placeholder="Password" className="logintext" />
                    <button className="loginButton" onClick={() => {navigate('/')}}>login</button>
                    <span className="forgotPass">forgot password</span>
                    <button className="newAccButton" onClick={() => {navigate('/Register')}}>Register</button>

                </div>
            </div>
        </div>
    </div>
    </>
    
  );
}
