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
        this.load.image(MAP_ASSET_KEYS.BLANK, 'assets/images/blank.png');

        this.load.spritesheet(MAP_ASSET_KEYS.UNIT, 'assets/tilesets/unit.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet(MAP_ASSET_KEYS.MAP, 'assets/tilesets/map.png', { frameWidth: 10, frameHeight: 10 });
        this.load.spritesheet(MAP_ASSET_KEYS.SELECTION, 'assets/tilesets/selection.png', { frameWidth: 12, frameHeight: 12 });

        this.load.bitmapFont(MAP_ASSET_KEYS.FRAME_FONT, 'assets/fonts/main-8/font.png', 'assets/fonts/main-8/font.xml');
    }

    create() {
        this.scene.start(SCENE_KEYS.GAME_SCENE);
    }
}
