import { MAP_ASSET_KEYS } from "../keys/asset.js";
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
    #enemy;

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
    get enemy() { return this.#enemy; }
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
        
        return this.#background;
    }

    /**
     * @param {string} assetKey
     * @param {number} frame
     */
    createOverlay(assetKey, frame) {
        this.#overlay = new TileEntity(this._scene, TILE_ENTITY_TYPE.OVERLAY);
        this.#overlay.create(assetKey, frame);
        this.#container.add(this.#overlay.gameObject);
    }

    createEnemy(assetKey, frame) {
        this.#enemy = new TileEntity(this._scene, TILE_ENTITY_TYPE.ENEMY);
        this.#enemy.create(assetKey, frame);
        this.#container.add(this.#enemy.gameObject);
    }

    showLabel(text) {
        let label = this._scene.add.bitmapText(0, 0, MAP_ASSET_KEYS.FRAME_FONT, text, 8);
        label.setOrigin(0.5);
        // label.y -= label.height/2 + 2;
        this.#container.add(label);
    }
}
