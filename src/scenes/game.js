import Phaser from "../lib/phaser.js";

import { SCENE_KEYS } from "../keys/scene.js";
import { Map } from "../map/map.js";
import { MAP_ASSET_KEYS } from "../keys/asset.js";

export class GameScene extends Phaser.Scene {
    #map;

    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        });
    }

    create() {
        this.#map = new Map(this, 10, 10);
        this.#map.container.x = (this.scale.width - this.#map.container.getBounds().width) - 3;
        // this.#map.container.y = (this.scale.height - this.#map.container.getBounds().height) - 3;
        this.#map.container.y = this.scale.width - this.#map.container.getBounds().width - 3;
        this.add.existing(this.#map.container);

        for (let y=0; y<this.#map.height; y++) {
            let frame = this.add.image(0, 0, MAP_ASSET_KEYS.BLANK);
            frame.setTint(0x221208);
            frame.displayHeight = 30;
            frame.displayWidth = this.scale.width - this.#map.container.getBounds().width - 6;
            frame.y = this.#map.container.y + (y * frame.displayHeight) + 15;
            frame.x = this.#map.container.x - frame.displayWidth/2 - 1;

            for (let i=0; i<5; i++) {
                let text = this.add.bitmapText(frame.x + frame.displayWidth/2, frame.y, MAP_ASSET_KEYS.FRAME_FONT, i.toString(), 8);
                text.y -= text.height/2 - 1;
                text.x -= text.width + 2 + (i * (text.width + 4));
            }
        }

        for (let x=0; x<this.#map.width; x++) {
            let frame = this.add.image(0, 0, MAP_ASSET_KEYS.BLANK);
            frame.setTint(0x221208);
            frame.displayHeight = this.scale.width - this.#map.container.getBounds().width - 6;
            frame.displayWidth = 30;
            frame.x = this.#map.container.x + (x * frame.displayWidth) + 15;
            frame.y = this.#map.container.y - frame.displayHeight/2 - 1;

            for (let i=0; i<5; i++) {
                let text = this.add.bitmapText(frame.x, frame.y + frame.displayHeight/2, MAP_ASSET_KEYS.FRAME_FONT, i.toString(), 8);
                text.x -= text.width/2;
                text.y -= text.height + 2 + (i * (text.height + 4));
            }
        }
    }
}
