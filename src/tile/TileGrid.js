import Color from '../common/Color.js';
import LinkedList from '../common/LinkedList.js';
import GradientTile from './GradientTile.js';


//TrailingTileGrid
export default function TileGrid(dimensions = { rows: 0, cols: 0 }, offset = { x: 0, y: 0 }, tileDimensions = { width: 1, height: 1 }) {

    const grid = [];
    const updateQueue = new LinkedList();
    const drawQueue = new LinkedList();

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
        updateQueue.addTail(grid[row][col]);
        drawQueue.addTail(grid[row][col]);
    }

    this.update = function (time) {
        const size = updateQueue.size();
        for (let i = 0; i < size; i++) {
            let tile = updateQueue.removeHead();
            if (tile.update()) {
                updateQueue.addTail(tile);
            }
            drawQueue.addTail(tile);
        }
    }

    this.draw = function (time) {
        const size = drawQueue.size();
        for (let i = 0; i < size; i++) {
            let tile = drawQueue.removeHead();
            tile.draw();
        }
    };
}

