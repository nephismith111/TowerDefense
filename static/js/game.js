// Logging utility
const Logger = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 1, // Default to INFO

    debug: (msg) => {
        if (Logger.level <= Logger.DEBUG) console.debug('[DEBUG]', msg);
    },
    info: (msg) => {
        if (Logger.level <= Logger.INFO) console.info('[INFO]', msg);
    },
    warn: (msg) => {
        if (Logger.level <= Logger.WARN) console.warn('[WARN]', msg);
    },
    error: (msg) => {
        if (Logger.level <= Logger.ERROR) console.error('[ERROR]', msg);
    }
};

// Game constants and configurations
const CONFIG = {
    GRID_SIZE: 40,
    INITIAL_MONEY: 150,
    INITIAL_LIVES: 15,
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    
    TOWER_TYPES: {
        BASIC: {
            id: 'basic',
            cost: 50,
            range: 100,
            damage: 10,
            fireRate: 1000,
            color: '#3498db',
            name: 'Basic Tower'
        },
        SNIPER: {
            id: 'sniper',
            cost: 100,
            range: 200,
            damage: 30,
            fireRate: 2000,
            color: '#e74c3c',
            name: 'Sniper Tower'
        },
        // Add more tower types as per spec
    },

    ENEMY_TYPES: {
        BASIC: {
            id: 'basic',
            speed: 1,
            health: 30,
            value: 10,
            color: '#e74c3c',
            size: 10
        },
        // Add more enemy types as per spec
    }
};

class Tower {
    constructor(x, y, type) {
        const config = CONFIG.TOWER_TYPES[type.toUpperCase()];
        if (!config) {
            Logger.error(`Invalid tower type: ${type}`);
            throw new Error(`Invalid tower type: ${type}`);
        }

        Object.assign(this, config);
        this.x = x;
        this.y = y;
        this.lastShot = 0;
        this.target = null;
        Logger.debug(`Created ${this.name} at (${x}, ${y})`);
    }

    update(enemies, projectiles) {
        const now = Date.now();
        if (now - this.lastShot < this.fireRate) return;

        const target = this.findTarget(enemies);
        if (target) {
            this.shoot(target, projectiles);
            this.lastShot = now;
        }
    }

    findTarget(enemies) {
        return enemies.find(enemy => {
            const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            return dist <= this.range;
        });
    }

    shoot(target, projectiles) {
        projectiles.push(new Projectile(this.x, this.y, target, this.damage));
        Logger.debug(`Tower fired at enemy`);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Enemy {
    constructor(type, path) {
        const config = CONFIG.ENEMY_TYPES[type.toUpperCase()];
        if (!config) {
            Logger.error(`Invalid enemy type: ${type}`);
            throw new Error(`Invalid enemy type: ${type}`);
        }

        Object.assign(this, config);
        this.path = path;
        this.pathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
        this.health = this.maxHealth = config.health;
        Logger.debug(`Spawned ${type} enemy`);
    }

    update() {
        if (this.pathIndex >= this.path.length - 1) return true;

        const target = this.path[this.pathIndex + 1];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.pathIndex++;
            Logger.debug(`Enemy reached waypoint ${this.pathIndex}`);
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }

        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = `rgb(${255 * (1 - healthPercent)}, ${255 * healthPercent}, 0)`;
        ctx.fillRect(this.x - 15, this.y - 20, 30 * healthPercent, 5);
    }
}

class Projectile {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = 5;
        Logger.debug(`Created projectile at (${x}, ${y})`);
    }

    update() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.target.health -= this.damage;
            Logger.debug(`Projectile hit enemy for ${this.damage} damage`);
            return true;
        }

        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

class GameState {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.money = CONFIG.INITIAL_MONEY;
        this.lives = CONFIG.INITIAL_LIVES;
        this.wave = 1;
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.selectedTower = null;
        
        Logger.info('Game state initialized');
    }

    update() {
        // Update all game entities
        this.enemies = this.enemies.filter(enemy => {
            const reachedEnd = enemy.update();
            if (reachedEnd) {
                this.lives--;
                Logger.warn(`Enemy reached end! Lives: ${this.lives}`);
                return false;
            }
            return enemy.health > 0;
        });

        this.towers.forEach(tower => 
            tower.update(this.enemies, this.projectiles)
        );

        this.projectiles = this.projectiles.filter(proj => 
            !proj.update()
        );

        this.updateUI();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        for (let x = 0; x < this.canvas.width; x += CONFIG.GRID_SIZE) {
            for (let y = 0; y < this.canvas.height; y += CONFIG.GRID_SIZE) {
                this.ctx.strokeStyle = '#2f3640';
                this.ctx.strokeRect(x, y, CONFIG.GRID_SIZE, CONFIG.GRID_SIZE);
            }
        }

        // Draw all game entities
        this.towers.forEach(tower => tower.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.projectiles.forEach(proj => proj.draw(this.ctx));
    }

    updateUI() {
        document.getElementById('money').textContent = this.money;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('wave').textContent = this.wave;
    }
}

// Initialize game
const game = new GameState();

// Main game loop
function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Starting game...');
    gameLoop();
});

// Event listeners
document.addEventListener('click', (e) => {
    if (game.selectedTower) {
        const rect = game.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Snap to grid
        const gridX = Math.floor(x / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
        const gridY = Math.floor(y / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
        
        try {
            game.towers.push(new Tower(gridX, gridY, game.selectedTower));
            Logger.info(`Placed ${game.selectedTower} tower at (${gridX}, ${gridY})`);
        } catch (error) {
            Logger.error(error.message);
        }
    }
});
