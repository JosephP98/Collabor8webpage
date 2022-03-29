import { Component } from 'react';
import { io } from 'socket.io-client';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import './canvas.css';

// TODO : move steck to seperate file?
// TODO : abstract function
function sketch(p) {
  let socket;
  let canvas;
  let paintBrushData = {};
  //let inputQue = [];

  p.updateWithProps = props => {
    socket = props.socket;
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
    socket.on('load', o => {
      if (o !== null) {
        let img = p.loadImage(o.e, () => {
          p.image(img, 0, 0);
        });
      }
    });
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

  // p.keyPressed = (e) => {
  //   // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
  //   if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
  //     let c = document.getElementsByTagName('canvas')[0].toDataURL('image/png');
  //     console.log(c);
  //     socket.emit('save', { e: c });
  //   }

  //   // if (e.keyCode === 88) {
  //   //   console.log('z');
  //   //   socket.emit('load', (c) => { console.log(c); });
  //   // }
  // }


  p.mouseReleased = () => {
    let c = document.getElementsByTagName('canvas')[0].toDataURL('image/png');
    socket.emit('save', { e: c });
  }
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ReactP5Wrapper sketch={sketch} socket={this.props.socket}/>
    )
  }
}

export default Canvas;