import { Component } from 'react';
import { io } from 'socket.io-client';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import './canvas.css';

// TODO : move steck to seperate file?
// TODO : abstract function
function sketch(p) {
  let socket;
  let img;
  let paintBrushData = {};
  //let inputQue = [];

  p.updateWithProps = props => {
    socket = props.socket;
    img = props.img;
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

  p.preload = () => {
    console.log(img);
      if (img !== null) {
        let c = p.loadImage(img.data, () => {
          p.image(c, 0, 0);
        });
      }
  }

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
      
      fetch('http://localhost:3001/api/db/collab/868f21e1-d3e2-4bed-92bd-339eace7725b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          img_data: img_data
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('saved:', data);
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
    this.state = {socket: this.props.socket, img: this.props.img};
  }

  render() {
    const { socket, img } = this.state;
    return (
      <ReactP5Wrapper sketch={sketch} socket={socket} img={img}/>
    )
  }
}

export default Canvas;