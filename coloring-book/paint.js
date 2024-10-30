"use strict";
// Jeremy Meyers, 10/30/2024
/* 
    Adapted from Wes Bos's https://javascript30.com/
    Fun with HTML5 Canvas project
*/
/*
    New concepts:
    Canvas API
    
    Challenges:
    Canvas API
*/

// Wes Bos
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// My modifications
canvas.height = canvas.getBoundingClientRect().height;
canvas.width = canvas.offsetWidth;

// Wes Bos
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// My code to organize tools (adds modularity and allows for easy additions of tools)
const TOOLS = {
    currentTool: 'paintbrush',
    paintbrush: function(e) {
        // Wes Bos's draw function stripped to the basics; original, unneeded code commented out
        
        if (!isDrawing) return;
        
        // console.log(e);
        // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        
        ctx.beginPath();
    
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
        
        // hue++;
        
        // if (hue >= 360) hue = 0;
    
        // if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        //     direction = !direction;
        // }
        // if (direction) {
        //     ctx.lineWidth++;
        // } else {
        //     ctx.lineWidth--;
        // }
    },
    colorPicker: { 
        currentColor: document.querySelector('#color').value, 
        element: document.querySelector('#color'), 
        label: document.querySelector('#color-picker'), 
        changeBGColor: function() {
            TOOLS.colorPicker.currentColor = document.querySelector('#color').value;
            TOOLS.colorPicker.label.style.backgroundColor = TOOLS.colorPicker.currentColor;
            
            // Tests color picked to show a white or black version of background image for better contrast
            if (TOOLS.colorPicker.averageOfColor(TOOLS.colorPicker.currentColor) >= 128) {
                TOOLS.colorPicker.label.style.backgroundImage = 'url("./paint-brush-drawing-icon-black.svg")';
            } else {
                TOOLS.colorPicker.label.style.backgroundImage = 'url("./paint-brush-drawing-icon-white.svg")';
            }

            ctx.strokeStyle = TOOLS.colorPicker.currentColor;
        },
        averageOfColor: function(hex) {
            const red = parseInt(`0x${hex.slice(1, 3)}`);
            const green = parseInt(`0x${hex.slice(3, 5)}`);
            const blue = parseInt(`0x${hex.slice(5)}`);

            return (red + green + blue) / 3; // Averages rgb to determine basic lightness
        }
    },
    stroke: {
        element: document.querySelector('#stroke-size'),
        size: document.querySelector('#stroke-size').value,
        changeStrokeWidth: function() {
            TOOLS.stroke.size = TOOLS.stroke.element.value;
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

// Wes Bos's event listeners for drawing
canvas.addEventListener('mousemove', (e) => TOOLS[TOOLS.currentTool](e));
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// My event listeners for tools and selecting a coloring page
TOOLS.colorPicker.element.addEventListener('change', TOOLS.colorPicker.changeBGColor);
TOOLS.stroke.element.addEventListener('change', TOOLS.stroke.changeStrokeWidth);
TOOLS.clear.element.addEventListener('mousedown', TOOLS.clear.clearCanvas);

document.querySelector('#coloring-pages').addEventListener('click', (e) => {
    if (e.target.tagName === "DIV") return;

    if (document.querySelector('.selected-page')) {
        const previousPage = document.querySelector('.selected-page');
        previousPage.classList.remove('selected-page');
        if (e.target == previousPage) {
            canvas.style.background = `none`;
            return;
        }
    }

    e.target.classList.toggle('selected-page');

    canvas.style.background = `no-repeat center url(${e.target.src})`;
    canvas.style.backgroundSize = 'contain';
});

// Initialize color picker and stroke size
TOOLS.colorPicker.changeBGColor();
TOOLS.stroke.changeStrokeWidth();