import React, { useEffect } from "react";
import { io } from 'socket.io-client';
import {useNavigate} from 'react-router-dom';



export default function Chat(props) {

    let navigate = useNavigate();

    function handleMessageSent(e) {
        const focusedElement = document.activeElement.tagName.toLowerCase();
        const charCode = (typeof e.which == "number") ? e.which : e.keyCode;

        if (charCode === 13 && focusedElement === "textarea") {
            const messagebox = document.getElementsByTagName("textarea")[0];

            props.socket.emit('message', {
                id: props.socket.id,
                message: messagebox.value
            });

            messagebox.value = "";
        }

        
    }

    useEffect(() => {
        console.log(props.socket);
        props.socket.on('message', m => {
            const ul = document.getElementById("messages");
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`${m.id === props.socket.id ? "you" : m.id}: "${m.message}"`));
            ul.appendChild(li);
        });
    });

    return (

        <div className="chat" onKeyPress={handleMessageSent}>
            <div className="messageWindow">
                <ul id="messages"></ul>
            </div>
            <div className="messageInput">
                <textarea />
            </div>

            <button onClick={() => {navigate('/')}}>return home</button>
        </div>
        
    );
}

