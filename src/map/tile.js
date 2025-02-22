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

        this.#overlay = this._scene.add.sprite(x, y, assetKey, 0).setScale(TILE_SCALE).setOrigin(0.5);
        this.#container.add(this.#overlay);
        
        return this.#background;
    }

    removeOverlay() {
        this.#overlay.setAlpha(0);
    }
}
