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
    ENEMY_SPAWN_INTERVAL: 1000,
    MAX_ENEMIES_PER_WAVE: 10,
    WAVE_INCREASE_RATE: 1.1, // Enemies get 10% stronger each wave

    PATH_POINTS: [
        { x: 0, y: 120 },
        { x: 120, y: 120 },
        { x: 120, y: 480 },
        { x: 480, y: 480 },
        { x: 480, y: 120 },
        { x: 800, y: 120 }
    ],

    TOWER_TYPES: {
        BALANCED: {
            id: 'balanced',
            cost: 100,
            range: 120,
            damage: 10,
            fireRate: 1000,
            color: '#3498db',
            name: 'Balanced Tower'
        },
        RAPID: {
            id: 'rapid',
            cost: 50,
            range: 80,
            damage: 5,
            fireRate: 300,
            color: '#2ecc71',
            name: 'Rapid Tower'
        },
        SLOW: {
            id: 'slow',
            cost: 150,
            range: 160,
            damage: 20,
            fireRate: 2000,
            color: '#9b59b6',
            name: 'Slow Tower',
            special: 'slow'
        },
        SNIPER: {
            id: 'sniper',
            cost: 150,
            range: 200,
            damage: 40,
            fireRate: 3000,
            color: '#e74c3c',
            name: 'Sniper Tower'
        },
        SPREADSHOT: {
            id: 'spreadshot',
            cost: 100,
            range: 120,
            damage: 8,
            fireRate: 1000,
            color: '#f1c40f',
            name: 'Spreadshot Tower',
            special: 'spread'
        },
        SPLASH: {
            id: 'splash',
            cost: 150,
            range: 120,
            damage: 15,
            fireRate: 1500,
            color: '#e67e22',
            name: 'Splash Tower',
            special: 'splash'
        },
        FREEZE: {
            id: 'freeze',
            cost: 150,
            range: 80,
            damage: 0,
            fireRate: 2000,
            color: '#00ffff',
            name: 'Freeze Tower',
            special: 'freeze'
        },
        POISON: {
            id: 'poison',
            cost: 100,
            range: 120,
            damage: 5,
            fireRate: 1000,
            color: '#8e44ad',
            name: 'Poison Tower',
            special: 'poison'
        },
        LASER: {
            id: 'laser',
            cost: 200,
            range: 120,
            damage: 2,
            fireRate: 0, // Continuous
            color: '#ffffff',
            name: 'Laser Tower',
            special: 'laser'
        },
        MONEY: {
            id: 'money',
            cost: 150,
            range: 0,
            damage: 0,
            fireRate: 0,
            color: '#ffd700',
            name: 'Money Tower',
            special: 'money'
        }
    },

    ENEMY_TYPES: {
        STANDARD: {
            id: 'standard',
            speed: 1,
            health: 30,
            value: 10,
            color: '#e74c3c',
            size: 10,
            description: 'Standard Baddie'
        },
        SLOW_TANK: {
            id: 'slow_tank',
            speed: 0.5,
            health: 100,
            value: 20,
            color: '#34495e',
            size: 15,
            description: 'Slow Tank'
        },
        FAST: {
            id: 'fast',
            speed: 2,
            health: 15,
            value: 15,
            color: '#f1c40f',
            size: 8,
            description: 'Fast Baddie',
            special: 'fast'
        },
        STUNNER: {
            id: 'stunner',
            speed: 1,
            health: 30,
            value: 20,
            color: '#9b59b6',
            size: 10,
            description: 'Stunner',
            special: 'stun'
        },
        DESTROYER: {
            id: 'destroyer',
            speed: 0.5,
            health: 300,
            value: 50,
            color: '#e74c3c',
            size: 20,
            description: 'Destroyer',
            special: 'destroy'
        },
        SPLITTER: {
            id: 'splitter',
            speed: 1,
            health: 30,
            value: 15,
            color: '#2ecc71',
            size: 10,
            description: 'Splitter',
            special: 'split'
        },
        SHIELDED: {
            id: 'shielded',
            speed: 1,
            health: 30,
            shield: 30,
            value: 20,
            color: '#95a5a6',
            size: 12,
            description: 'Shielded Baddie',
            special: 'shield'
        },
        INVISIBLE: {
            id: 'invisible',
            speed: 1,
            health: 20,
            value: 25,
            color: '#ffffff',
            size: 10,
            description: 'Invisible Baddie',
            special: 'invisible'
        },
        HEALER: {
            id: 'healer',
            speed: 0.5,
            health: 40,
            value: 30,
            color: '#00ff00',
            size: 12,
            description: 'Healer',
            special: 'heal'
        },
        REGENERATOR: {
            id: 'regenerator',
            speed: 1,
            health: 30,
            value: 25,
            color: '#ff69b4',
            size: 10,
            description: 'Regenerator',
            special: 'regenerate'
        }
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
        if (this.special === 'money') {
            // Money Tower generates money over time
            if (!this.lastGenerated || now - this.lastGenerated >= 5000) {
                game.money += 10;
                this.lastGenerated = now;
                Logger.debug('Money Tower generated $10');
            }
            return;
        }

        if (this.fireRate > 0 && now - this.lastShot < this.fireRate) return;

        let targets = this.findTargets(enemies);
        if (targets.length > 0) {
            this.attack(targets, projectiles);
            this.lastShot = now;
        }
    }

    findTargets(enemies) {
        if (this.special === 'spread') {
            // Find multiple targets in cone
            return enemies.filter(enemy => {
                const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                return dist <= this.range;
            }).slice(0, 3); // Limit to 3 targets
        } else if (this.special === 'laser') {
            // Laser Tower targets first enemy in range
            return enemies.filter(enemy => {
                const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                return dist <= this.range;
            });
        } else {
            // Standard targeting
            let target = enemies.find(enemy => {
                const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                return dist <= this.range;
            });
            return target ? [target] : [];
        }
    }

    attack(targets, projectiles) {
        if (this.special === 'slow') {
            // Apply slow effect to enemies in range
            targets.forEach(target => {
                target.slowEffect = 0.5; // Reduce speed by 50%
                target.slowDuration = 2000; // Lasts for 2 seconds
            });
            Logger.debug('Slow Tower applied slow effect');
        } else if (this.special === 'freeze') {
            // Freeze enemies in range
            targets.forEach(target => {
                target.freezeDuration = 2000; // Freeze for 2 seconds
            });
            Logger.debug('Freeze Tower froze enemies');
        } else if (this.special === 'poison') {
            // Apply poison effect
            targets.forEach(target => {
                target.poisonDamage = 2; // Damage over time
                target.poisonDuration = 5000; // Lasts for 5 seconds
            });
            Logger.debug('Poison Tower applied poison effect');
        } else if (this.special === 'splash') {
            // Splash damage
            projectiles.push(new Projectile(this.x, this.y, targets[0], this.damage, 'splash'));
            Logger.debug('Splash Tower fired');
        } else if (this.special === 'spread') {
            // Fire multiple projectiles
            targets.forEach(target => {
                projectiles.push(new Projectile(this.x, this.y, target, this.damage));
            });
            Logger.debug('Spreadshot Tower fired at multiple targets');
        } else if (this.special === 'laser') {
            // Continuous damage
            targets.forEach(target => {
                target.health -= this.damage;
            });
            Logger.debug('Laser Tower dealing continuous damage');
        } else {
            // Standard attack
            projectiles.push(new Projectile(this.x, this.y, targets[0], this.damage));
            Logger.debug('Tower fired at enemy');
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw range circle if selected
        if (game.selectedTower && game.selectedTower === this.id) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            ctx.strokeStyle = `${this.color}88`;
            ctx.stroke();
        }
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
        this.health = this.maxHealth = config.health * Math.pow(CONFIG.WAVE_INCREASE_RATE, game.wave - 1);
        this.speed *= Math.pow(CONFIG.WAVE_INCREASE_RATE, game.wave - 1);
        this.value *= Math.pow(CONFIG.WAVE_INCREASE_RATE, game.wave - 1);
        Logger.debug(`Spawned ${this.description} enemy`);

        // Special abilities
        if (this.special === 'shield') {
            this.shield = config.shield;
        }
    }

    update() {
        // Apply slow effect
        if (this.slowDuration > 0) {
            this.slowDuration -= game.deltaTime;
            this.currentSpeed = this.speed * this.slowEffect;
        } else {
            this.currentSpeed = this.speed;
            this.slowEffect = 1;
        }

        // Apply freeze effect
        if (this.freezeDuration > 0) {
            this.freezeDuration -= game.deltaTime;
            return false; // Enemy is frozen, skip movement
        }

        // Apply poison effect
        if (this.poisonDuration > 0) {
            this.poisonDuration -= game.deltaTime;
            if (!this.lastPoisonTick || Date.now() - this.lastPoisonTick >= 1000) {
                this.health -= this.poisonDamage;
                this.lastPoisonTick = Date.now();
            }
        }

        // Regenerate health if regenerator
        if (this.special === 'regenerate') {
            this.health = Math.min(this.health + 0.1 * this.maxHealth * (game.deltaTime / 1000), this.maxHealth);
        }

        // Heal nearby enemies if healer
        if (this.special === 'heal') {
            game.enemies.forEach(enemy => {
                if (enemy !== this && Math.hypot(enemy.x - this.x, enemy.y - this.y) < 50) {
                    enemy.health = Math.min(enemy.health + 0.05 * enemy.maxHealth * (game.deltaTime / 1000), enemy.maxHealth);
                }
            });
        }

        // Move along the path
        if (this.pathIndex >= this.path.length - 1) return true;

        const target = this.path[this.pathIndex + 1];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.currentSpeed) {
            this.pathIndex++;
            Logger.debug(`Enemy reached waypoint ${this.pathIndex}`);
        } else {
            this.x += (dx / dist) * this.currentSpeed;
            this.y += (dy / dist) * this.currentSpeed;
        }

        return false;
    }

    draw(ctx) {
        // Handle invisibility
        if (this.special === 'invisible' && !game.canSeeInvisible) {
            return; // Do not draw if towers can't see invisible enemies
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = `rgb(${255 * (1 - healthPercent)}, ${255 * healthPercent}, 0)`;
        ctx.fillRect(this.x - 15, this.y - 20, 30 * healthPercent, 5);

        // Draw shield
        if (this.shield > 0) {
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    }
}

class Projectile {
    constructor(x, y, target, damage, type = 'standard') {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = 5;
        this.type = type;
        Logger.debug(`Created projectile at (${x}, ${y})`);
    }

    update() {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.hit();
            return true;
        }

        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
        return false;
    }

    hit() {
        if (this.type === 'splash') {
            // Splash damage
            game.enemies.forEach(enemy => {
                const dist = Math.hypot(enemy.x - this.target.x, enemy.y - this.target.y);
                if (dist <= 30) {
                    enemy.takeDamage(this.damage);
                }
            });
            Logger.debug('Projectile caused splash damage');
        } else {
            this.target.takeDamage(this.damage);
            Logger.debug(`Projectile hit enemy for ${this.damage} damage`);
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}

Enemy.prototype.takeDamage = function (damage) {
    if (this.shield > 0) {
        const shieldDamage = Math.min(this.shield, damage);
        this.shield -= shieldDamage;
        damage -= shieldDamage;
    }
    this.health -= damage;
};

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
        this.waveInProgress = false;
        this.enemiesSpawned = 0;
        this.maxEnemiesPerWave = CONFIG.MAX_ENEMIES_PER_WAVE;
        this.lastSpawnTime = 0;
        this.spawnInterval = CONFIG.ENEMY_SPAWN_INTERVAL;
        this.gameOver = false;
        this.lastUpdateTime = Date.now();
        this.deltaTime = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.canSeeInvisible = false; // Assume certain towers can set this to true

        this.initializeTowerSelection();
        Logger.info('Game state initialized');

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('click', (e) => {
            if (this.selectedTower) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Snap to grid
                const gridX = Math.floor(x / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
                const gridY = Math.floor(y / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

                // Check if position is valid (not on path)
                if (this.isValidTowerPosition(gridX, gridY)) {
                    const towerConfig = CONFIG.TOWER_TYPES[this.selectedTower.toUpperCase()];
                    if (this.money >= towerConfig.cost) {
                        try {
                            this.towers.push(new Tower(gridX, gridY, this.selectedTower));
                            this.money -= towerConfig.cost;
                            Logger.info(`Placed ${this.selectedTower} tower at (${gridX}, ${gridY})`);
                        } catch (error) {
                            Logger.error(error.message);
                        }
                    } else {
                        Logger.warn('Not enough money to place this tower');
                    }
                } else {
                    Logger.warn('Cannot place tower on the path');
                }
            }
        });
    }

    initializeTowerSelection() {
        const towerSelection = document.getElementById('towerSelection');
        towerSelection.innerHTML = '';

        Object.entries(CONFIG.TOWER_TYPES).forEach(([key, tower]) => {
            const button = document.createElement('button');
            button.textContent = `${tower.name} ($${tower.cost})`;
            button.onclick = () => this.selectTower(tower.id);
            towerSelection.appendChild(button);
        });
    }

    selectTower(towerId) {
        const towerConfig = CONFIG.TOWER_TYPES[towerId.toUpperCase()];
        if (this.money >= towerConfig.cost) {
            this.selectedTower = towerId;
            Logger.info(`Selected ${towerId} tower`);
        } else {
            Logger.warn('Not enough money for this tower');
        }
    }

    update() {
        if (this.gameOver) return;

        const now = Date.now();
        this.deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now;

        // Spawn enemies
        if (this.enemiesSpawned < this.maxEnemiesPerWave && now - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnEnemy();
            this.lastSpawnTime = now;
        }

        // Update enemies
        this.enemies = this.enemies.filter(enemy => {
            const reachedEnd = enemy.update();
            if (reachedEnd) {
                this.lives--;
                Logger.warn(`Enemy reached end! Lives: ${this.lives}`);
                this.displayPoof(enemy.x, enemy.y);
                return false;
            }
            if (enemy.health <= 0) {
                this.money += enemy.value;
                this.displayPoof(enemy.x, enemy.y);
                return false;
            }
            return true;
        });

        // Update towers
        this.towers.forEach(tower => tower.update(this.enemies, this.projectiles));

        // Update projectiles
        this.projectiles = this.projectiles.filter(proj => !proj.update());

        // Check for game over
        if (this.lives <= 0) {
            this.gameOver = true;
            Logger.info('Game Over!');
            alert('Game Over!');
        }

        // Start next wave if current wave is over
        if (this.enemiesSpawned >= this.maxEnemiesPerWave && this.enemies.length === 0) {
            this.wave++;
            this.enemiesSpawned = 0;
            this.maxEnemiesPerWave = Math.ceil(this.maxEnemiesPerWave * 1.2); // Increase enemies per wave
            Logger.info(`Wave ${this.wave} starting`);
        }

        this.updateUI();
    }

    spawnEnemy() {
        // Randomly select an enemy type based on wave
        const enemyTypes = Object.keys(CONFIG.ENEMY_TYPES);
        const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.enemies.push(new Enemy(randomType, CONFIG.PATH_POINTS));
        this.enemiesSpawned++;
    }

    isValidTowerPosition(x, y) {
        // Check if the position overlaps with the path
        // Simple check: ensure it's not within a certain distance from path points
        for (let i = 0; i < CONFIG.PATH_POINTS.length - 1; i++) {
            const start = CONFIG.PATH_POINTS[i];
            const end = CONFIG.PATH_POINTS[i + 1];
            const dist = this.pointToSegmentDistance({ x, y }, start, end);
            if (dist < CONFIG.GRID_SIZE / 2) {
                return false;
            }
        }
        return true;
    }

    pointToSegmentDistance(point, start, end) {
        // Calculate the distance from a point to a line segment
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const lengthSquared = dx * dx + dy * dy;
        let t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));
        const projection = { x: start.x + t * dx, y: start.y + t * dy };
        return Math.hypot(point.x - projection.x, point.y - projection.y);
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

        // Draw path
        this.ctx.beginPath();
        this.ctx.moveTo(CONFIG.PATH_POINTS[0].x, CONFIG.PATH_POINTS[0].y);
        CONFIG.PATH_POINTS.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.strokeStyle = '#95a5a6';
        this.ctx.lineWidth = 30;
        this.ctx.stroke();
        this.ctx.lineWidth = 1;

        // Draw all game entities
        this.towers.forEach(tower => tower.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.projectiles.forEach(proj => proj.draw(this.ctx));

        // Draw tower preview
        if (this.selectedTower) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = Math.floor((this.mouseX) / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;
            const mouseY = Math.floor((this.mouseY) / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE + CONFIG.GRID_SIZE / 2;

            const towerConfig = CONFIG.TOWER_TYPES[this.selectedTower.toUpperCase()];
            this.ctx.beginPath();
            this.ctx.arc(mouseX, mouseY, towerConfig.range, 0, Math.PI * 2);
            this.ctx.strokeStyle = `${towerConfig.color}88`;
            this.ctx.stroke();

            // Draw tower placeholder
            this.ctx.beginPath();
            this.ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
            this.ctx.fillStyle = `${towerConfig.color}88`;
            this.ctx.fill();
        }

        // Draw Poof effects
        this.drawPoofs();
    }

    updateUI() {
        document.getElementById('money').textContent = Math.floor(this.money);
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('wave').textContent = this.wave;
    }

    displayPoof(x, y) {
        this.poofs = this.poofs || [];
        this.poofs.push({ x, y, time: Date.now() });
    }

    drawPoofs() {
        if (!this.poofs) return;
        const now = Date.now();
        this.poofs = this.poofs.filter(poof => {
            const elapsed = now - poof.time;
            if (elapsed > 1000) return false;

            this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - elapsed / 1000})`;
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Poof!', poof.x - 20, poof.y - elapsed / 10);
            return true;
        });
    }
}

// Initialize game
const game = new GameState();

// Main game loop
function gameLoop() {
    game.update();
    game.draw();
    if (!game.gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Starting game...');
    gameLoop();
});
