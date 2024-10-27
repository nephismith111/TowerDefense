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
        RAPID: {
            id: 'rapid',
            cost: 75,
            range: 100,
            damage: 4,
            fireRate: 250,
            color: '#2ecc71',
            name: 'Rapid Fire',
            description: 'Fast but weak shots',
            maxCount: 8
        },
        BALANCED: {
            id: 'balanced',
            cost: 100,
            range: 130,
            damage: 12,
            fireRate: 800,
            color: '#3498db',
            name: 'Balanced',
            description: 'All-round performer',
            maxCount: 6,
            style: {
                border: '2px solid #2980b9',
                shadow: '0 0 10px rgba(52, 152, 219, 0.5)'
            }
        },
        SNIPER: {
            id: 'sniper',
            cost: 175,
            range: 250,
            damage: 100,  // Increased damage
            fireRate: 2000,
            color: '#e74c3c',
            name: 'Sniper',
            description: 'Long range, high damage',
            maxCount: 10  // Limit to 2 sniper towers
        },
        SPLASH: {
            id: 'splash',
            cost: 200,
            range: 110,
            damage: 20,
            fireRate: 1200,
            color: '#e67e22',
            name: 'Splash Damage',
            special: 'splash',
            description: 'Area damage',
            maxCount: 4
        },
        SLOW: {
            id: 'slow',
            cost: 150,
            range: 140,
            damage: 15,
            fireRate: 1000,
            color: '#9b59b6',
            name: 'Slowing Tower',
            special: 'slow',
            description: 'Slows enemies',
            maxCount: 4
        },
        FREEZE: {
            id: 'freeze',
            cost: 225,
            range: 100,
            damage: 5,
            fireRate: 1500,
            color: '#00ffff',
            name: 'Freeze Ray',
            special: 'freeze',
            description: 'Temporarily freezes',
            maxCount: 3,
            style: {
                border: '2px solid #00cccc',
                shadow: '0 0 15px rgba(0, 255, 255, 0.6)'
            }
        },
        POISON: {
            id: 'poison',
            cost: 175,
            range: 130,
            damage: 8,
            fireRate: 1000,
            color: '#8e44ad',
            name: 'Poison Tower',
            special: 'poison',
            description: 'Damage over time',
            maxCount: 4
        },
        SPREADSHOT: {
            id: 'spreadshot',
            cost: 250,
            range: 200,
            damage: 15,
            fireRate: 1200,
            color: '#f1c40f',
            name: 'Spread Shot',
            special: 'spread',
            description: 'Hits multiple targets',
            maxCount: 3
        },
        LASER: {
            id: 'laser',
            cost: 300,
            range: 150,
            damage: 2,  // Reduced damage
            fireRate: 100,  // Added small delay between shots
            color: '#ffffff',
            name: 'Laser Beam',
            special: 'laser',
            description: 'Continuous damage',
            maxCount: 3,  // Limit to 3 laser towers
            style: {
                border: '2px solid #cccccc',
                shadow: '0 0 20px rgba(255, 255, 255, 0.8)'
            }
        },
        MONEY: {
            id: 'money',
            cost: 200,
            range: 0,
            damage: 0,
            fireRate: 0,
            color: '#ffd700',
            name: 'Money Maker',
            special: 'money',
            description: 'Generates income',
            maxCount: 5
        }
    },

    ENEMY_TYPES: {
        STANDARD: {
            id: 'standard',
            speed: 1,
            health: 25,
            value: 8,
            color: '#e74c3c',
            size: 10,
            description: 'Standard Baddie',
            minWave: 1,
            style: {
                border: '2px solid #c0392b',
                shadow: '0 0 8px rgba(231, 76, 60, 0.6)'
            }
        },
        FAST: {
            id: 'fast',
            speed: 2.5,
            health: 15,
            value: 12,
            color: '#f1c40f',
            size: 8,
            description: 'Fast Runner',
            minWave: 1,
            special: 'fast'
        },
        SLOW_TANK: {
            id: 'slow_tank',
            speed: 0.4,
            health: 150,
            value: 25,
            color: '#34495e',
            size: 15,
            description: 'Heavy Tank',
            minWave: 2
        },
        SHIELDED: {
            id: 'shielded',
            speed: 0.8,
            health: 40,
            shield: 200,
            value: 20,
            color: '#95a5a6',
            size: 12,
            description: 'Shielded Unit',
            minWave: 4,
            special: 'shield'
        },
        REGENERATOR: {
            id: 'regenerator',
            speed: 0.9,
            health: 45,
            value: 30,
            color: '#ff69b4',
            size: 10,
            description: 'Self-Healer',
            minWave: 3,
            special: 'regenerate'
        },
        INVISIBLE: {
            id: 'invisible',
            speed: 1.2,
            health: 30,
            value: 35,
            color: '#ffffff',
            size: 10,
            description: 'Stealth Unit',
            minWave: 3,
            special: 'invisible'
        },
        HEALER: {
            id: 'healer',
            speed: 0.6,
            health: 60,
            value: 40,
            color: '#00ff00',
            size: 12,
            description: 'Squad Medic',
            minWave: 4,
            special: 'heal'
        },
        STUNNER: {
            id: 'stunner',
            speed: 1.1,
            health: 50,
            value: 45,
            color: '#9b59b6',
            size: 10,
            description: 'Tower Disruptor',
            minWave: 4,
            special: 'stun'
        },
        SPLITTER: {
            id: 'splitter',
            speed: 0.8,
            health: 45,
            value: 50,
            color: '#2ecc71',
            size: 10,
            description: 'Splitting Unit',
            minWave: 5,
            special: 'split'
        },
        DESTROYER: {
            id: 'destroyer',
            speed: 0.4,
            health: 400,
            value: 100,
            color: '#e74c3c',
            size: 20,
            description: 'Tower Destroyer',
            minWave: 4,
            special: 'destroy',
            projectileSpeed: 2.5,
            baseFireRate: 2500,
            maxPerWave: wave => Math.min(Math.floor(wave / 2), 30), // Max destroyers increases faster, caps at 30
            spawnProbability: wave => Math.min(0.2 + (wave - 6) * 0.1, 0.9), // 20% base + 10% per wave after 6, caps at 90%
            style: {
                border: '3px solid #000000',
                shadow: '0 0 15px rgba(231, 76, 60, 0.6)'
            }
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
            // Laser Tower targets only the first enemy in range
            const target = enemies.find(enemy => {
                const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                return dist <= this.range;
            });
            return target ? [target] : [];
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
            this.target = targets[0]; // Store the target for drawing
            projectiles.push(new Projectile(this.x, this.y, targets[0], this.damage, 'splash'));
            Logger.debug('Splash Tower fired');
        } else if (this.special === 'spread') {
            // Fire multiple projectiles
            this.currentTargets = targets;
            targets.forEach(target => {
                projectiles.push(new Projectile(this.x, this.y, target, this.damage));
            });
            Logger.debug('Spreadshot Tower fired at multiple targets');
        } else if (this.special === 'laser') {
            // Continuous damage
            this.target = targets[0];
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
        // Draw shadow if specified
        if (this.style?.shadow) {
            ctx.shadowColor = this.style.shadow.split('rgba')[1].slice(0, -1);
            ctx.shadowBlur = parseInt(this.style.shadow.match(/\d+/)[0]);
        }

        // Draw main tower body with original color
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw border if specified
        if (this.style?.border) {
            ctx.strokeStyle = this.style.border.split(' ')[2];
            ctx.lineWidth = parseInt(this.style.border.split(' ')[0]);
            ctx.stroke();
        }

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;

        // Draw range circle if selected
        if (game.selectedTower && game.selectedTower === this.id) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            ctx.strokeStyle = `${this.color}88`;
            ctx.stroke();
        }

        // Draw special effects
        if (this.special === 'laser' && this.target && this.target.health > 0) {
            // Draw laser beam
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.target.x, this.target.y);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Add glow effect
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.lineWidth = 1;
        } else if (this.special === 'splash' && this.lastShot > Date.now() - 200 && this.target) {
            // Draw splash area
            ctx.beginPath();
            ctx.arc(this.target.x, this.target.y, 30, 0, Math.PI * 2);
            ctx.fillStyle = `${this.color}44`;
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else if (this.special === 'spread' && this.lastShot > Date.now() - 200) {
            // Draw spread lines to all targets
            ctx.beginPath();
            this.currentTargets?.forEach(target => {
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(target.x, target.y);
            });
            ctx.strokeStyle = `${this.color}88`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.lineWidth = 1;
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

        // Draw shadow if specified
        if (this.style?.shadow) {
            ctx.shadowColor = this.style.shadow.split('rgba')[1].slice(0, -1);
            ctx.shadowBlur = parseInt(this.style.shadow.match(/\d+/)[0]);
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw border if specified
        if (this.style?.border) {
            ctx.strokeStyle = this.style.border.split(' ')[2];
            ctx.lineWidth = parseInt(this.style.border.split(' ')[0]);
            ctx.stroke();
        }

        // Reset shadow and line width
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;

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
        this.flashEffects = []; // Track tower destruction animations
        this.speedMultiplier = 1;
        this.towerCounts = {}; // Track number of each tower type
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
        
        // Initialize speed control
        const speedControl = document.getElementById('gameSpeed');
        speedControl.addEventListener('change', (e) => {
            this.speedMultiplier = parseFloat(e.target.value);
            Logger.info(`Game speed set to ${this.speedMultiplier}x`);
        });
        
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
                        // Check tower limit
                        this.towerCounts[this.selectedTower] = this.towerCounts[this.selectedTower] || 0;
                        if (towerConfig.maxCount && this.towerCounts[this.selectedTower] >= towerConfig.maxCount) {
                            Logger.warn(`Cannot place more than ${towerConfig.maxCount} ${this.selectedTower} towers`);
                            return;
                        }
                        try {
                            this.towers.push(new Tower(gridX, gridY, this.selectedTower));
                            this.money -= towerConfig.cost;
                            this.towerCounts[this.selectedTower]++;
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
        const enemyLegend = document.querySelector('.legend-grid');
        
        // Initialize tower counts
        Object.keys(CONFIG.TOWER_TYPES).forEach(type => {
            this.towerCounts[type.toLowerCase()] = 0;
        });
        
        // Clear existing content
        towerSelection.innerHTML = '';
        enemyLegend.innerHTML = '';

        // Initialize tower selection - sort by cost
        Object.entries(CONFIG.TOWER_TYPES)
            .sort((a, b) => a[1].cost - b[1].cost)
            .forEach(([key, tower]) => {
            const button = document.createElement('button');
            
            // Add special class based on tower type
            if (tower.special) {
                button.classList.add(`tower-${tower.special}`);
            }
            
            const colorDiv = document.createElement('div');
            colorDiv.className = 'tower-color';
            colorDiv.style.backgroundColor = tower.color;
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'tower-name';
            nameDiv.textContent = tower.name;
            
            const costDiv = document.createElement('div');
            costDiv.className = 'tower-cost';
            costDiv.textContent = `$${tower.cost}`;

            // Add special effect indicator if tower has special ability
            if (tower.special) {
                const specialDiv = document.createElement('div');
                specialDiv.className = 'tower-special';
                specialDiv.textContent = `⚡ ${tower.special}`;
                button.appendChild(specialDiv);
            }
            
            button.appendChild(colorDiv);
            button.appendChild(nameDiv);
            button.appendChild(costDiv);
            // Add tower count if there's a limit
            if (tower.maxCount) {
                const countDiv = document.createElement('div');
                countDiv.className = 'tower-count';
                countDiv.textContent = `${this.towerCounts[tower.id] || 0}/${tower.maxCount}`;
                button.appendChild(countDiv);
            }
            
            button.onclick = () => this.selectTower(tower.id);
            
            towerSelection.appendChild(button);
        });

        // Initialize enemy legend
        Object.entries(CONFIG.ENEMY_TYPES).forEach(([key, enemy]) => {
            const enemyDiv = document.createElement('div');
            enemyDiv.className = 'enemy-type';
            
            const colorDiv = document.createElement('div');
            colorDiv.className = 'enemy-color';
            colorDiv.style.backgroundColor = enemy.color;
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'enemy-info';
            infoDiv.textContent = `${enemy.description}`;
            
            enemyDiv.appendChild(colorDiv);
            enemyDiv.appendChild(infoDiv);
            
            enemyLegend.appendChild(enemyDiv);
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
        this.deltaTime = (now - this.lastUpdateTime) * this.speedMultiplier;
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
            
            // Destroyer enemy special ability
            if (enemy.special === 'destroy') {
                // Initialize lastShot if not exists
                if (typeof enemy.lastShot === 'undefined') {
                    enemy.lastShot = 0;
                }
                
                const now = Date.now();
                // Calculate fire rate based on wave number (gets faster as waves progress)
                const fireRate = CONFIG.ENEMY_TYPES.DESTROYER.baseFireRate * (1 / (1 + Math.log(this.wave) / 2)); // Fires faster in later waves
                const projectileSpeed = CONFIG.ENEMY_TYPES.DESTROYER.projectileSpeed * (1 + Math.log(this.wave) / 3); // Projectiles move faster in later waves
                
                if (now - enemy.lastShot >= fireRate) {
                    // Find the nearest tower to target
                    let nearestTower = null;
                    let minDistance = Infinity;
                    this.towers.forEach(tower => {
                        const dist = Math.hypot(tower.x - enemy.x, tower.y - enemy.y);
                        if (dist < minDistance) {
                            minDistance = dist;
                            nearestTower = tower;
                        }
                    });

                    if (nearestTower) {
                        const projectile = {
                            x: enemy.x,
                            y: enemy.y,
                            targetX: nearestTower.x,
                            targetY: nearestTower.y,
                            speed: CONFIG.ENEMY_TYPES.DESTROYER.projectileSpeed * (1 + Math.log(this.wave) / 3),
                            color: '#ff0000'
                        };
                        if (!this.destroyerProjectiles) this.destroyerProjectiles = [];
                        this.destroyerProjectiles.push(projectile);
                    }
                    enemy.lastShot = now;
                }
                
                // Update and check destroyer projectiles
                if (this.destroyerProjectiles) {
                    this.destroyerProjectiles = this.destroyerProjectiles.filter(proj => {
                        // Move projectile
                        const dx = proj.targetX - proj.x;
                        const dy = proj.targetY - proj.y;
                        const dist = Math.hypot(dx, dy);
                        
                        if (dist < proj.speed) {
                            // Hit tower
                            this.towers = this.towers.filter(tower => {
                                if (tower.x === proj.targetX && tower.y === proj.targetY) {
                                    Logger.warn('Destroyer projectile destroyed a tower!');
                                    this.displayPoof(tower.x, tower.y);
                                    this.flashEffects.push({
                                        x: tower.x,
                                        y: tower.y,
                                        startTime: Date.now(),
                                        duration: 500,
                                        radius: 30
                                    });
                                    // Decrease tower count when destroyed
                                    const towerType = tower.id.toLowerCase();
                                    if (this.towerCounts[towerType] > 0) {
                                        this.towerCounts[towerType]--;
                                    }
                                    return false;
                                }
                                return true;
                            });
                            return false;
                        }
                        
                        proj.x += (dx / dist) * proj.speed;
                        proj.y += (dy / dist) * proj.speed;
                        return true;
                    });
                }
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
        // Initialize destroyer count for this wave if not exists
        if (this.wave >= CONFIG.ENEMY_TYPES.DESTROYER.minWave) {
            this.destroyerCount = this.destroyerCount || 0;
        }

        // Filter enemy types based on current wave
        const availableTypes = Object.entries(CONFIG.ENEMY_TYPES)
            .filter(([type, config]) => {
                if (type === 'DESTROYER') {
                    // Check destroyer-specific conditions
                    const maxDestroyers = config.maxPerWave(this.wave);
                    const probability = config.spawnProbability(this.wave);
                    return config.minWave <= this.wave && 
                           this.destroyerCount < maxDestroyers && 
                           Math.random() < probability;
                }
                return config.minWave <= this.wave;
            })
            .map(([type, _]) => type);

        // Weight the random selection towards appropriate enemies for the current wave
        const weights = availableTypes.map(type => {
            const config = CONFIG.ENEMY_TYPES[type];
            const waveDiff = this.wave - config.minWave;
            return Math.max(0, 10 - waveDiff);
        });

        // Weighted random selection
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let selectedType = availableTypes[0];

        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                selectedType = availableTypes[i];
                break;
            }
        }

        // Track destroyer count
        if (selectedType === 'DESTROYER') {
            this.destroyerCount++;
        }

        this.enemies.push(new Enemy(selectedType, CONFIG.PATH_POINTS));
        this.enemiesSpawned++;
        Logger.debug(`Spawned ${selectedType} enemy in wave ${this.wave}`);
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

        // Draw lighter background
        this.ctx.fillStyle = '#2f3542';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw path with alternating hash patterns
        this.ctx.beginPath();
        this.ctx.moveTo(CONFIG.PATH_POINTS[0].x, CONFIG.PATH_POINTS[0].y);
        CONFIG.PATH_POINTS.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.strokeStyle = '#576574';
        this.ctx.lineWidth = 30;
        this.ctx.stroke();
        this.ctx.lineWidth = 1;

        // Draw all game entities
        this.towers.forEach(tower => tower.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.projectiles.forEach(proj => proj.draw(this.ctx));
        
        // Draw destroyer projectiles
        if (this.destroyerProjectiles) {
            this.destroyerProjectiles.forEach(proj => {
                this.ctx.beginPath();
                this.ctx.arc(proj.x, proj.y, 5, 0, Math.PI * 2);
                this.ctx.fillStyle = proj.color;
                this.ctx.fill();
                
                // Add a glowing effect
                this.ctx.shadowColor = '#ff0000';
                this.ctx.shadowBlur = 10;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            });
        }

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
        
        // Draw flash effects
        this.flashEffects = this.flashEffects.filter(flash => {
            const elapsed = Date.now() - flash.startTime;
            if (elapsed > flash.duration) return false;
            
            const progress = elapsed / flash.duration;
            const alpha = 1 - progress;
            const radius = flash.radius * (1 + progress);
            
            this.ctx.beginPath();
            this.ctx.arc(flash.x, flash.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.5})`;
            this.ctx.fill();
            
            return true;
        });
    }

    updateUI() {
        document.getElementById('money').textContent = Math.floor(this.money);
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('wave').textContent = this.wave;
        
        // Update tower counts
        Object.keys(CONFIG.TOWER_TYPES).forEach(type => {
            const countElement = document.querySelector(`#towerSelection button:nth-child(${Object.keys(CONFIG.TOWER_TYPES).indexOf(type) + 1}) .tower-count`);
            if (countElement) {
                const towerType = type.toLowerCase();
                const maxCount = CONFIG.TOWER_TYPES[type].maxCount;
                countElement.textContent = `${this.towerCounts[towerType] || 0}/${maxCount}`;
            }
        });
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
