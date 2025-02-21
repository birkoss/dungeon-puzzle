import Phaser from "../lib/phaser.js";

import { SCENE_KEYS } from "../keys/scene.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        });
    }

    create() {
        // ...
        console.log("GAME...");
    }
}
