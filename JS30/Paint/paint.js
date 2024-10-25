"use strict";
// Jeremy Meyers, 10/24/2024
// Tutorial Code
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Mine
canvas.height = canvas.getBoundingClientRect().height;
canvas.width = canvas.offsetWidth;

// TC
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const tools = {
    currentTool: 'paintbrush',
    paintbrush: function(e) {
        if (!isDrawing) return; // stop drawing
        ctx.beginPath();
    
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
}

canvas.addEventListener('mousemove', tools[tools.currentTool]);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

/*
    original draw function:
    if (!isDrawing) return; // stop drawing
        console.log(e);
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
    
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
        hue++;
        
        if (hue >= 360) hue = 0;
    
        if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
            direction = !direction;
        }
        if (direction) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
*/