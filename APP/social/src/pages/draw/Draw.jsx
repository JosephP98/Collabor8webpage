
//i do not claim this code to be mine, it is technically sourced code as i followed a tutorial for how to implement this draw/paint canvas app
//no copy pasting took place
//i will comment this to prove my understanding

import React, { useCallback, useEffect, useRef, useState} from 'react'

const colors = ["red", "green", "yellow", "black", "blue"]
export default function Draw(){


    const canvasRef = useRef(null);
    const ctx = useRef(null);
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [mouseDown, setMouseDown] = useState(false);
    const [lastPosition, setPosition] = useState({x: 0, y: 0});

    const draw = useCallback((x, y) => {
        if(mouseDown) {
            ctx.current.beginPath();
            ctx.current.strokeStyle = selectedColor;
            ctx.current.lineWidth = 10;
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(lastPosition.x, lastPosition.y);
            ctx.current.lineTo(x, y);
            ctx.current.closePath();
            ctx.current.stroke(); 

            setPosition({x, y})


        }
    }, [lastPosition, mouseDown, selectedColor, setPosition]);

    const download = async () => {
        const image = canvasRef.current.toDataURL('image/jpg');
        const blob = await ( await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);
        const Link = document.createElement('a');
        Link.href = blobURL;
        Link.download = "image.jpg";
        Link.click();

    }

    const clear = () => {ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)}


    const onMouseDown = (e) => {setPosition({x: e.pageX, y: e.pageY}); setMouseDown(true)}

    const onMouseUp = (e) => {setMouseDown(false)}
    
    const onMouseMove = (e) => {draw(e.pageX, e.pageY)}

   

    useEffect(() => {
        if (canvasRef.current){
            ctx.current = canvasRef.current.getContext('2d');
        }
    }, []);


  return (
    <div>

        <canvas style={{
            border: "1px solid #000"
        }} width={400} height={400} ref={canvasRef}
        
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        
        />
        <br />
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            {colors.map(color => <option value={color}>{color}</option>)}

        </select>

        <button onClick={clear}>Clear</button>
        <button onClick={download}>Download</button>

    </div>
  );
}
