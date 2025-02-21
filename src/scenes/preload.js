import Phaser from "../lib/phaser.js";

import { SCENE_KEYS } from "../keys/scene.js";
import { MAP_ASSET_KEYS } from "../keys/asset.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        });
    }

    preload() {
        this.load.spritesheet(MAP_ASSET_KEYS.UNIT, 'assets/tilesets/unit.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet(MAP_ASSET_KEYS.WORLD, 'assets/tilesets/world.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet(MAP_ASSET_KEYS.SELECTION, 'assets/tilesets/selection.png', { frameWidth: 12, frameHeight: 12 });
    }

    create() {
        this.scene.start(SCENE_KEYS.GAME_SCENE);
    }
}
