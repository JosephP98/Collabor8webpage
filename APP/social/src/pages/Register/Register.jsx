import React, { useState } from 'react'
import "./Register.css"
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState(0);
    const [email, setEmail] = useState(0);
    const [pass, setPass] = useState(0);

    const submit = () => {
        if (username && email && pass) {
            fetch('http://localhost:3001/api/db/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: pass
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('saved:', data);
                    localStorage.setItem("uuid", data.uuid_v4);

                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

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
                    <input placeholder="Username" className="logintext" onChange={e => setUsername(e.target.value)}/>
                    <input placeholder="Email Address" className="logintext" onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Password" className="logintext" onChange={e => setPass(e.target.value)} />
                    <input placeholder="Confirm Password" className="logintext" />
                          <button className="loginButton" onClick={submit}>Sign Up</button>
                    <button className="newAccButton" onClick={() => {navigate('/Login')}}>Already have an account?</button>
                    

                </div>
            </div>
        </div>
    </div>
    </>
    
  );
}
