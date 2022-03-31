import { Component } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { io } from 'socket.io-client';
import Canvas from '../../components/canvas/canvas';
import MyButton from '../../components/button';
import Chat from '../../components/Chat/chat';
import './CanvasPage.css'

class CanvasPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {isLoading: true, socketConnected: false, socket: null, data: null, room: props.uuid};
  }
  handleLoad() {
    fetch('http://localhost:3001/api/db/collab/' + this.state.room, { method: 'GET', mode: 'cors' })
      .then(res => {
        return res.json();
      }).then(data => {
        this.setState({isLoading : false, data: data});
      });
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);

    socketio.on('connect', () => {
      socketio.emit('join', { room: this.state.room });
      this.setState({ socketConnected: true, socket: socketio });
    });
  }

   componentWillUnmount() { 
     window.removeEventListener('load', this.handleLoad);
     socketio.off('connect');
 }

  render() {
    const { isLoading, socketConnected } = this.state;
    const { socket, data, room } = this.state;
    // console.log("loading: " + isLoading);
    // console.log("connected: " + socketConnected);
    //console.log(data);

      return (isLoading || !socketConnected || !data) ? <div>
          <p>BUFFERING... { isLoading } and { data }</p>
        </div> : (
      <div className="body" >
        <Canvas socket={socket} img={data} uuid={room}/>
        <MyButton />
        <Chat socket={socket}/>
      </div>
      
    );

  }
}

const socketio = io("http://localhost:3001");
const Wrapper = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const { uuid } = state;

    return (<CanvasPage uuid={uuid.uuid_v4}/>)
  }

export default Wrapper;
