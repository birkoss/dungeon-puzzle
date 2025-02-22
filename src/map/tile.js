import { TILE_ENTITY_TYPE, TileEntity } from "./entity.js";

export const TILE_SCALE = 3;

export class Tile {
    /** @type {Phaser.Scene} */
    _scene;
    /** @type {number} */
    #x;
    /** @type {number} */
    #y;

    /** @type {Phaser.GameObjects.Container} */
    #container;

    #background;
    #overlay;

    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        this._scene = scene;
        this.#x = x;
        this.#y = y;

        this.#container = scene.add.container(0, 0);
    }

    get container() { return this.#container; }
    get background() { return this.#background; }
    get overlay() { return this.#overlay; }
    get x() { return this.#x; }
    get y() { return this.#y; }

    /**
     * @param {string} assetKey
     * @param {number} frame
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    create(assetKey, frame, x = 0, y = 0) {
        this.#background = this._scene.add.sprite(x, y, assetKey, frame).setScale(TILE_SCALE).setOrigin(0.5);
        this.#container.add(this.#background);

        this.#overlay = new TileEntity(this._scene, TILE_ENTITY_TYPE.OVERLAY);
        this.#overlay.create(assetKey, 0);
        this.#container.add(this.#overlay.gameObject);
        
        return this.#background;
    }
}
