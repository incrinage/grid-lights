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


//todo learn how renderer works so that this code can be refactored
function draw() {
    return new Promise(() => {
        const currTime = new Date().getTime();
        if (currTime - start > 250) {
            if (path.hasMove()) {
                    const p = path.move();
                    maze.setTileColor(p.x, p.y, '#000000');
                    maze.draw();
                    maze.update();
                    start = new Date().getTime();
                
            } else if (!path.hasMove()) {
                path.setLocation(getRandomInt(rows), getRandomInt(cols));
                path.setDestination(getRandomInt(rows), getRandomInt(cols));
            } 
        }

        return window.requestAnimationFrame(draw);
    });
}
let d = new Date();
let start = d.getTime();

draw();