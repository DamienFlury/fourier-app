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


            let x = centerX;
            let y = centerY;

            for (let i = 1; i <= 9; i += 2) {
                const prevX = x;
                const prevY = y;

                const currentRadius = initialRadius * 4 / (i * Math.PI);

                x += currentRadius * Math.cos(i * time);
                y += currentRadius * Math.sin(i * time);


                ctx.strokeStyle = "rgba(255,165,0,0.5)"
                ctx.beginPath();
                ctx.arc(prevX, prevY, currentRadius, 0, 2 * Math.PI);
                ctx.stroke();


                ctx.strokeStyle = "#000000"
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            const nextWavePoints = wavePoints.slice();
            nextWavePoints.unshift(y)
            setWavePoints(nextWavePoints);

            ctx.beginPath();
            ctx.moveTo(x, y)
            for (let i = 0; i < wavePoints.length; i++) {
                ctx.lineTo(i + 300, wavePoints[i]);
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