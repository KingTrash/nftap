import React, {useContext, useEffect, useRef, useState} from "react";
import {resetCanvas} from "./game";


export let  koords = [];
export let isScreening = false

export default function Canvas (){

    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [x1, setX1] = useState()
    const [x2, setX2] = useState()
    const [y1, setY1] = useState()
    const [y2, sety2] = useState()


    useEffect(() =>{
        console.log(resetCanvas)
        const canvas = canvasRef.current
        canvas.width = 255*2;
        canvas.height = 255*2;
        canvas.style.width = `${255}px`;
        canvas.style.height = `${255}px`;


        const context = canvas.getContext("2d")
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context



    }, [])



    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setX1(offsetX);
        setY1(offsetY)
        setIsDrawing(true);
        isScreening = true
        contextRef.current.clearRect(0, 0, window.innerHeight, window.innerWidth);

    };

    const finishDrawing = () => {
        //console.log(resetCanvas)
        if (resetCanvas === true){
            koords = {
                x1:0,
                x2:0,
                y1:0,
                y2:0
            }
        }
        if (resetCanvas === false){
            koords = {
                x1:x1,
                x2:x2,
                y1:y1,
                y2:y2
            }
        }

            setIsDrawing(false);
        if (x1 > x2 + 5 || y1 > y2 +5){
            isScreening = false
        }


    };


    const draw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        if (isDrawing) {

            setX2(offsetX)
            sety2(offsetY)
            contextRef.current.clearRect(0, 0, window.innerHeight, window.innerWidth);
            contextRef.current.beginPath();
            contextRef.current.rect(x1, y1, (x2 - x1), (y2 - y1));
            contextRef.current.stroke();

        }

    };

         const  clearCanvas = ({children}) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }


    return(
        <canvas
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onMouseDown={startDrawing}
            ref={canvasRef}
        />)
}
