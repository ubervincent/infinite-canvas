const canvas = document.getElementById("infiniteCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

function drawGrid(ctx, cellSize = 50, color = '#ddd') {
    // Set grid line style
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.1;

    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw the grid
drawGrid(context, 100, "black");

function calculateCellSize() {
    return Math.min(window.innerWidth, window.innerHeight) / 10;
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    drawGrid(context, calculateCellSize(), "black");
});

let currentScale = 100; // Base scale
const MIN_SCALE = 10;   // Minimum grid size
const MAX_SCALE = 200;  // Maximum grid size

window.addEventListener("wheel", (event) => {
    event.preventDefault();

    // Adjust scale more gradually
    currentScale += event.deltaY * 0.1;
    currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, currentScale));
    
    // Clear and redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, currentScale, "black");
}, { passive: false });

