import { Component } from 'react';
import { io } from 'socket.io-client';
import Canvas from '../../components/canvas/canvas';
import MyButton from '../../components/button';
import Chat from '../../components/Chat/chat';
import './CanvasPage.css'


const socketio = io("http://localhost:3001");
class CanvasPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {isLoading: true, socketConnected: false, socket: null, data: null};
  }

  handleLoad() {
    fetch('http://localhost:3001/api/db/collab/643502d2-b545-429b-b9a2-b4c569079fa0', { method: 'GET', mode: 'cors' })
      .then(res => {
        return res.json();
      }).then(data => {
        //console.log(data);
        this.setState({isLoading : false, data: data});
      });
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);

    socketio.on('connect', () => {
      //console.log(socketio);
      this.setState({ socketConnected: true, socket: socketio });
    });
  }

   componentWillUnmount() { 
     window.removeEventListener('load', this.handleLoad);
     socketio.off('connect');
 }

  render() {
    const { isLoading, socketConnected } = this.state;
    console.log("loading: " + isLoading);
    console.log("connected: " + socketConnected);

    if (isLoading && !socketConnected) {
      return (
        <div>
          <p>BUFFERING... { isLoading } and { socketConnected }</p>
        </div>
      );
    }

    const { socket, data } = this.state;
    //console.log(data);

      return (
      <div className="body" >
        <Canvas socket={socket} img={data}/>
        <MyButton />
        <Chat socket={socket}/>
      </div>
      
    );

  }
}

export default CanvasPage;
