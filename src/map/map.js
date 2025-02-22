import { MAP_ASSET_KEYS } from "../keys/asset.js";
import { Tile } from "./tile.js";

export const MAP_FLOOR = Object.freeze({
    ENEMY: 'ENEMY',
    EXIT: 'EXIT',
});

export class Map {
    /** @type {Phaser.GameObjects.Container} */
    #container;
    /** @type {Phaser.Scene} */
    #scene;
    /** @type {number} */
    #width;
    /** @type {number} */
    #height;

    #selectedTile;

    /**
     * @param {Phaser.Scene} scene
     * @param {number} width
     * @param {number} height
     */
    constructor(scene, width, height) {
        this.#scene = scene;
        this.#width = width;
        this.#height = height;

        this.#container = this.#scene.add.container(0, 0);

        for (let y=0; y<this.#height; y++) {
            for (let x=0; x<this.#width; x++) {
                let tile = new Tile(this.#scene, x, y);
                tile.create(MAP_ASSET_KEYS.MAP, 4);

                tile.container.x = tile.x * tile.container.getBounds().width;
                tile.container.y = tile.y * tile.container.getBounds().height;

                tile.container.x += tile.container.getBounds().width/2;
                tile.container.y += tile.container.getBounds().height/2;

                this.#container.add(tile.container);

                tile.background.setInteractive();
                tile.background.on('pointerdown', (target) => {
                    this.#selectedTile = tile;
                });
                this.#scene.input.on('pointerupoutside', (target) => {
                    this.#selectedTile = null;
                });
            }
        }

        this.#scene.input.on('pointerup', (target) => {
            let x1 = target.worldX - this.#container.x + 15;
            let y1 = target.worldY - this.#container.y + 15;

            if (this.#selectedTile) {
                let x = this.#selectedTile.container.x;
                let y = this.#selectedTile.container.y;

                if (x1 > x && x1 < x + this.#selectedTile.container.getBounds().width && y1 > y && y1 < y + this.#selectedTile.container.getBounds().height) {
                    this.#selectedTile.removeOverlay();
                }
            }

            this.#selectedTile = null;
        });
    }

    get container() { return this.#container; }
    get height() { return this.#height; }
    get width() { return this.#width; }
}
