import Phaser from './lib/phaser.js';

import { PreloadScene } from './scenes/preload.js';
import { GameScene } from './scenes/game.js';
import { SCENE_KEYS } from './keys/scene.js';

const game = new Phaser.Game({
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    scale: {
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: '#333333',
  
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);

game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
