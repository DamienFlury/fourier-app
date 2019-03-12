import React, { useState, useEffect, useRef } from 'react';

const FourierSeriesCanvas = () => {
    const [time, setTime] = useState(0);
    const [wavePoints, setWavePoints] = useState([]);
    const canvas = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const ctx = canvas.current.getContext('2d');
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);


            const initialRadius = 50;
            const offsetX = 100;
            const offsetY = 150;


            const centerX = offsetX + initialRadius;
            const centerY = offsetY + initialRadius;

            let currentX = centerX;
            let currentY = centerY;

            for (let i = 1; i <= 3; i+=2) {

                const currentRadius = initialRadius * 4 / (i * Math.PI);

                
                ctx.strokeStyle = "rgba(255,165,0,0.5)"
                ctx.beginPath();
                ctx.arc(currentX, currentY, currentRadius, 0, 2 * Math.PI);
                ctx.stroke();



                const dx = currentRadius * Math.cos(i * time);
                const dy = currentRadius * Math.sin(i * time);
                const nextX = (currentX + dx);
                const nextY = (currentY + dy);
                ctx.strokeStyle = "#000000"
                ctx.beginPath();
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(nextX, nextY);
                ctx.stroke();
                currentX = nextX;
                currentY = nextY;
            }
            const nextWavePoints = wavePoints.slice();
            nextWavePoints.unshift({currentX, currentY})
            setWavePoints(nextWavePoints);

            ctx.beginPath();
            ctx.moveTo(0, 0)
            for(let i = 1; i < wavePoints.length; i++) {
                ctx.lineTo(wavePoints[i].currentX, wavePoints[i].currentY);
            }
            ctx.stroke();

            // ctx.clearRect(0, 0, canvas.width, canvas.height);

            setTime(time + 0.05);
        }, 5);
        return () => {
            clearTimeout(timeout);
        }
    });


    return (
        <canvas ref={canvas} width="1000px" height="500px" style={{ border: 'solid 1px', margin: 20 }}></canvas>
    )
}

export default FourierSeriesCanvas;