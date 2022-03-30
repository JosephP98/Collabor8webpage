import React, { useState } from 'react'
import "./Login.css"
import {useNavigate} from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState(0);
    const [pass, setPass] = useState(0);

    const submit = () => {
        if (email && pass) {
            fetch('http://localhost:3001/api/db/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    email: email,
                    password: pass
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('saved:', data);

                    if (!data.err) {
                        localStorage.setItem("uuid", data.uuid);
                        navigate('/');
                    } else {
                        alert("no matching credentials");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
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
                    <input placeholder="Email Address" className="logintext" onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Password" className="logintext" onChange={e => setPass(e.target.value)}/>
                    <button className="loginButton" onClick={submit}>login</button>
                    <span className="forgotPass">forgot password</span>
                    <button className="newAccButton" onClick={() => {navigate('/Register')}}>Register</button>

                </div>
            </div>
        </div>
    </div>
    </>
    
  );
}
