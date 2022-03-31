import { Component } from 'react';
import { io } from 'socket.io-client';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import './canvas.css';

// TODO : move steck to seperate file?
// TODO : abstract function
function sketch(p) {
  let socket;
  let uuid;
  let paintBrushData = {};
  //let inputQue = [];

  p.updateWithProps = props => {
    socket = props.socket;
    uuid = props.uuid;

    let c = p.loadImage(props.img.data, () => {
      p.image(c, 0, 0);
    });
  }

  p.draw = () => {
    p.stroke(255);
    p.strokeWeight(10);

    socket.on('line', obj => {
      //inputQue.push(obj);
      //while (inputQue.length !== 0) {
        //let toDraw = inputQue.pop();

        //while (obj.mousePath.length !== 0) {
        let { px, py, x, y } = obj;
        p.line(px, py, x, y);
        //}
      //}
    });
  }

  p.preload = () => {  }

  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(102);
  }

  p.mouseDragged = () => {
    // p.stroke(255);
    // p.strokeWeight(4);
    //p.line(p.mouseX, p.mouseY, p.pmouseX, p.mouseY);
    let mouseX = p.mouseX, mouseY = p.mouseY, pmouseX = p.pmouseX, pmouseY = p.pmouseY;
    //p.circle(mouseX, mouseY, 4);

    //paintBrushData.push();

    socket.emit('line', {
      px: pmouseX, py: pmouseY,
      x: mouseX, y: mouseY
    });

  }

  p.mouseReleased = () => {
    const e = document.getElementsByTagName('canvas')[0]

    if (e) {
      let img = e.toDataURL('image/png');
      const img_data = JSON.stringify({ data: img });
      //console.log('http://localhost:3001/api/db/collab/' + uuid);
      
      fetch('http://localhost:3001/api/db/collab/' + uuid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          img_data: img_data
        })
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {socket: this.props.socket, img: this.props.img, uuid: this.props.uuid};
  }

  render() {
    const { socket, img, uuid } = this.state;
    return (
      <ReactP5Wrapper sketch={sketch} socket={socket} img={img} uuid={uuid}/>
    )
  }
}

export default Canvas;