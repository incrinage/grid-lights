import Maze from './Maze.js';
import { TILE_WIDTH, TILE_HEIGHT } from './Tile';
import Path from './Path.js';

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const rows = 10;
const cols = 10;
let drawTiles = { draw: true };

const mazeOffsetX = centerX - rows * TILE_WIDTH / 2;
const mazeOffsetY = centerY - cols * TILE_HEIGHT / 2;
const maze = new Maze(rows, cols, mazeOffsetX, mazeOffsetY, drawTiles);

//save path feature

const path = new Path();
path.setLocation(3, 7);
path.setDestination(0, 0);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//TODO: learn basic game design structure
function draw() {
    return new Promise(() => {
        const currTime = new Date().getTime();
        if (currTime - start > 100) { //how often to draw and set points

            if (path.hasMove()) {
                const p = path.move();
                maze.setTileColor(p.x, p.y, "#" + getRandomInt(16777215).toString(16));
            } else if (!path.hasMove()) {
                let startRow = getRandomInt(rows);
                let startCol = getRandomInt(cols);
                let endRow = getRandomInt(rows);
                let endCol = getRandomInt(rows);
                path.setLocation(startRow, startCol);
                path.setDestination(endRow, endCol);
            }

            maze.draw();
            maze.update();
            start = new Date().getTime();
        }
        return window.requestAnimationFrame(draw);
    });
}
let d = new Date();
let start = d.getTime();

draw();