import { Component } from 'react';
import { io } from 'socket.io-client';
import Canvas from '../../components/canvas/canvas';
import MyButton from '../../components/button';
import Chat from '../../components/Chat/chat';
import './CanvasPage.css'



const socket = io("http://localhost:3001");
class CanvasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
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

export default CanvasPage;
