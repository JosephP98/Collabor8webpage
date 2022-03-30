import React from 'react'
import "./Register.css"
import {useNavigate} from 'react-router-dom';


export default function Register() {
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
                    <input placeholder="Username" className="logintext" />
                    <input placeholder="Email Address" className="logintext" />
                    <input placeholder="Password" className="logintext" />
                    <input placeholder="Confirm Password" className="logintext" />
                    <button className="loginButton">Sign Up</button>
                    <button className="newAccButton" onClick={() => {navigate('/Login')}}>Already have an account?</button>
                    

                </div>
            </div>
        </div>
    </div>
    </>
    
  );
}
