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

    #tiles;
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

        this.#tiles = [];
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
                    this.#selectedTile.overlay.gameObject.setTint(0xaaaaaa);
                });

                this.#tiles.push(tile);
            }
        }

        this.#scene.input.on('pointerup', (target) => {
            let x1 = target.worldX - this.#container.x + 15;
            let y1 = target.worldY - this.#container.y + 15;

            if (this.#selectedTile) {
                this.#selectedTile.overlay.gameObject.setTint(0xffffff);

                let x = this.#selectedTile.container.x;
                let y = this.#selectedTile.container.y;

                if (x1 > x && x1 < x + this.#selectedTile.container.getBounds().width && y1 > y && y1 < y + this.#selectedTile.container.getBounds().height) {
                    this.#selectedTile.overlay.scaleOut();
                }
            }

            this.#selectedTile = null;
        });

        // Pick starting position
        let availableTiles = this.#tiles.filter((singleTile) => {
            return singleTile.x > 0 && singleTile.x < this.#width - 1 && singleTile.y > 0 && singleTile.y < this.#height - 1;
        });
        Phaser.Math.RND.shuffle(availableTiles);

        let startingTile = availableTiles.pop();
        let revealedTiles = [];
        for (let x=-1; x<=1; x++) {
            for (let y=-1; y<=1; y++) {
                let tile = this.#tiles.find((singleTile) => {
                    return singleTile.x === startingTile.x + x && singleTile.y === startingTile.y + y;
                });

                if (tile) {
                    revealedTiles.push(tile);
                }
            }
        }

        // Get all non-revealed tiles
        let nonRevealedTiles = this.#tiles.filter((singleTile) => {
            return !revealedTiles.includes(singleTile);
        });
        Phaser.Math.RND.shuffle(nonRevealedTiles);

        for (let i=0; i<Phaser.Math.Between(20, 40); i++) {
            let tile = nonRevealedTiles.pop();
            if (!tile) {
                continue;
            }
            
            tile.createEnemy(MAP_ASSET_KEYS.MAP, 9);
        }

        // Show labels
        this.#tiles.forEach((singleTile) => {
            if (singleTile.enemy) {
                return;
            }

            // Get neighboors
            let neighboors = this.#getNeighboors(singleTile);
            let enemyNear = neighboors.filter((singleNeighboor) => {
                return singleNeighboor.enemy;
            }).length;
            
            if (enemyNear > 0) {
                singleTile.showLabel(enemyNear);
            }
        });
        
    
        // Hide all tiles
        this.#tiles.forEach((singleTile) => {
            if (!revealedTiles.includes(singleTile)) {
                singleTile.createOverlay(MAP_ASSET_KEYS.MAP, 0);
            }
        });
    }

    get container() { return this.#container; }
    get height() { return this.#height; }
    get width() { return this.#width; }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {number[]}
     */
    getEnemiesAt(x, y) {
        let enemies = [];

        let isActive = false;        
        for (let i=0; i<(x === -1 ? this.#width : this.#height); i++) {
            let tile = this.#tiles.find((singleTile) => (x === -1 && singleTile.x === i && singleTile.y === y) || (y === -1 && singleTile.x === x && singleTile.y === i));
            if (!tile) {
                continue;
            }

            if (tile.enemy && !isActive) {
                isActive = true;
                enemies.push(1);
                continue;
            }

            if (tile.enemy) {
                enemies[enemies.length - 1]++;
                continue;
            }

            if (!tile.enemy && isActive) {
                isActive = false;
            }
        }

        return enemies.reverse();
    }

    /**
     * @param {Tile} tile
     * @returns {Tile[]}
     */
    #getNeighboors(tile) {
        let neighboors = [];
        for (let x=-1; x<=1; x++) {
            for (let y=-1; y<=1; y++) {
                let neighboor = this.#tiles.find((singleTile) => {
                    return singleTile !== tile && singleTile.x === tile.x + x && singleTile.y === tile.y + y;
                });

                if (neighboor) {
                    neighboors.push(neighboor);
                }
            }
        }
        return neighboors;
    }
    
}
