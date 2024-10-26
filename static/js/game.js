// Game constants and configurations
const GRID_SIZE = 40;
const CANVAS = document.getElementById('gameCanvas');
const CTX = CANVAS.getContext('2d');

// Game state
let gameState = {
    money: 150,
    lives: 15,
    wave: 1,
    towers: [],
    enemies: [],
    projectiles: []
};

// Initialize game
function init() {
    // TODO: Setup game initialization
    console.log("Game initialized");
}

// Main game loop
function gameLoop() {
    // TODO: Implement game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    init();
    gameLoop();
});
