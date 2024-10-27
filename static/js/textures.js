// Texture patterns for game elements
const TEXTURES = {
    // Path textures
    PATH_PATTERNS: [
        'repeating-linear-gradient(45deg, #95a5a6 0%, #95a5a6 10%, #7f8c8d 10%, #7f8c8d 20%)',
        'repeating-linear-gradient(-45deg, #95a5a6 0%, #95a5a6 5%, #7f8c8d 5%, #7f8c8d 10%)',
    ],
    
    // Background patterns
    BACKGROUND_PATTERNS: [
        'radial-gradient(circle at 30px 30px, #2c3e50 2px, transparent 2px)',
        'repeating-linear-gradient(0deg, transparent, transparent 20px, #2c3e50 20px, #2c3e50 21px)',
    ],
    
    // Tower patterns
    TOWER_PATTERNS: {
        RAPID: 'repeating-radial-gradient(circle at center, #2ecc71 0%, #27ae60 30%, #2ecc71 40%)',
        BALANCED: 'repeating-radial-gradient(circle at center, #3498db 0%, #2980b9 50%, #3498db 60%)',
        SNIPER: 'repeating-linear-gradient(45deg, #e74c3c 0%, #c0392b 25%, #e74c3c 50%)',
        SPLASH: 'radial-gradient(circle at center, #e67e22 0%, #d35400 100%)',
        SLOW: 'repeating-conic-gradient(#9b59b6 0%, #8e44ad 30deg)',
        FREEZE: 'conic-gradient(from 0deg, #00ffff 0%, #00cccc 180deg, #00ffff 360deg)',
        POISON: 'repeating-radial-gradient(circle at center, #8e44ad 0%, #6c3483 40%, #8e44ad 50%)',
        SPREADSHOT: 'repeating-conic-gradient(#f1c40f 0deg, #f39c12 60deg)',
        LASER: 'linear-gradient(90deg, #ffffff 0%, #ecf0f1 50%, #ffffff 100%)',
        MONEY: 'repeating-linear-gradient(-45deg, #ffd700 0%, #f1c40f 25%, #ffd700 50%)'
    },
    
    // Enemy patterns
    ENEMY_PATTERNS: {
        STANDARD: 'radial-gradient(circle at center, #e74c3c 0%, #c0392b 100%)',
        FAST: 'repeating-linear-gradient(45deg, #f1c40f 0%, #f39c12 10px, #f1c40f 20px)',
        SLOW_TANK: 'repeating-radial-gradient(circle at center, #34495e 0%, #2c3e50 20px)',
        SHIELDED: 'repeating-conic-gradient(#95a5a6 0deg, #7f8c8d 60deg)',
        REGENERATOR: 'radial-gradient(circle at center, #ff69b4 0%, #ff1493 100%)',
        INVISIBLE: 'repeating-linear-gradient(90deg, #ffffff22 0%, #ffffff11 10px)',
        HEALER: 'repeating-radial-gradient(circle at center, #00ff00 0%, #008000 30px)',
        STUNNER: 'repeating-conic-gradient(#9b59b6 0deg, #8e44ad 45deg)',
        SPLITTER: 'repeating-linear-gradient(-45deg, #2ecc71 0%, #27ae60 10px)',
        DESTROYER: 'repeating-radial-gradient(circle at center, #e74c3c 0%, #c0392b 10px, #e74c3c 20px)'
    }
};
