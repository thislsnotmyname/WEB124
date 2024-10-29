"use strict";
// Jeremy Meyers, 10/24/2024
/* 
    Adapted from Wes Bos's https://javascript30.com/
    Fun with HTML5 Canvas project
*/
/*
    New concepts:
    Canvas API
*/
// Tutorial Code
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Mine
canvas.height = canvas.getBoundingClientRect().height;
canvas.width = canvas.offsetWidth;

// TC
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// function createOverlayCanvas() {
//     const overlay = document.createElement('canvas');
//     overlay.id = 'overlay';
//     overlay.width = canvas.getBoundingClientRect().width - 10;
//     overlay.height = canvas.getBoundingClientRect().height - 10;
//     overlay.style.left = canvas.getBoundingClientRect().left + 'px';
//     canvas.parentNode.insertBefore(overlay, canvas);
//     return overlay;
// }

const TOOLS = {
    currentTool: 'paintbrush',
    paintbrush: function(e) {
        if (!isDrawing) return; // stop drawing
        ctx.beginPath();
    
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX + 5, e.offsetY - 10);
        
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    },

    colorPicker: { 
        currentColor: document.querySelector('#color').value, 
        element: document.querySelector('#color'), 
        label: document.querySelector('#color-picker'), 
        changeBGColor: function() {
            TOOLS.colorPicker.currentColor = document.querySelector('#color').value;
            TOOLS.colorPicker.label.style.backgroundColor = TOOLS.colorPicker.currentColor;
            ctx.strokeStyle = TOOLS.colorPicker.currentColor;
        },
    },
    stroke: {
        element: document.querySelector('#stroke-size'),
        size: document.querySelector('#stroke-size').value,
        changeStrokeWidth: function() {
            ctx.lineWidth = TOOLS.stroke.size;
        },
    },
    clear: {
        element: document.querySelector('#clear'),
        clearCanvas: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    },
}
    // rectangle: function(e) {
    //     if (!isDrawing) return;
    //     if (document.querySelector('#overlay')) { 
    //         const overlay = document.querySelector('#overlay');
    //     } else {
    //         const overlay = createOverlayCanvas();
    //     }
    //     const overlayCtx = overlay.getContext('2d');

    //     overlayCtx.beginPath();
    // }


// TC
canvas.addEventListener('mousemove', (e) => TOOLS[TOOLS.currentTool](e));
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    console.log(isDrawing);
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Mine
TOOLS.colorPicker.element.addEventListener('change', TOOLS.colorPicker.changeBGColor);
TOOLS.stroke.element.addEventListener('change', TOOLS.stroke.changeStrokeWidth);
TOOLS.clear.element.addEventListener('mousedown', TOOLS.clear.clearCanvas);

document.querySelector('#coloring-pages').addEventListener('click', (e) => {
    if (e.target.tagName === "DIV") return;
    
    document.querySelector('.selected-page').classList.remove('selected-page');
    e.target.className = 'pages selected-page';
    canvas.style.background = `no-repeat center url(${e.target.src})`;
});

TOOLS.colorPicker.changeBGColor();
TOOLS.stroke.changeStrokeWidth();


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