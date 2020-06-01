import Color from './Color.js';
import LinkedList from './LinkedList.js';
import GradientTile from './GradientTile.js';


export default function TileGrid(dimensions = { rows: 0, cols: 0 }, offset = { x: 0, y: 0 }, tileDimensions = { width: 1, height: 1 }) {


    //TODO: performance: draw grid lines but don't instantiate every tile at once. give the illusion of tiles drawn
    const grid = [];
    const tileQueue = new LinkedList();
    init();

    function init() {
        for (let i = 0; i < dimensions.rows; i++) {
            let row = [];
            for (let j = 0; j < dimensions.cols; j++) {
                const t = new GradientTile(tileDimensions, Color.WHITE, .3);
                t.color = Color.WHITE;
                t.x = t.w * i + offset.x;
                t.y = t.h * j + offset.y;
                row.push(t);
            }
            grid.push(row);
        }
    }


    this.setTileColor = function (row, col, color) {
        grid[row][col].color = color;
        tileQueue.add(grid[row][col]);
    }

    this.update = function (currTime) {
        const size = tileQueue.getSize();
        for (let i = 0; i < size; i++) {
            let tile = tileQueue.remove();
            if (tile.update()) {
                tileQueue.add(tile);
            }
        }
    }

    this.draw = function (currTime) {
        grid.forEach((tileRow) => {
            tileRow.forEach(t => t.draw());
        });
    };
}

