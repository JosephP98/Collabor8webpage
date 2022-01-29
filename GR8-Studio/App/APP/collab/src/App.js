import { Component } from 'react';
import { io } from 'socket.io-client';
import Canvas from './canvas';
import MyButton from './button';
import Chat from './chat';

import './App.css';

const socket = io("http://localhost:3001");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <Canvas socket={socket} />
        <MyButton />
        <Chat socket={socket}/>
      </div>
    );
  }
}

export default App;
