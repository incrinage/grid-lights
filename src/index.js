import TileGrid from './TileGrid.js';
import Path from './Path.js';

//TODO: canvas performance
const canvas = document.getElementById('canvas');

const gridDimensions = { rows: 30, cols: 30 };
const tileDimensions = { width: 15, height: 15 };

const canvasLeftAndRightMargin = tileDimensions.width*1;
const canvasTopAndBottomMargin = tileDimensions.height*1;

canvas.width = gridDimensions.rows*tileDimensions.width + canvasLeftAndRightMargin;
canvas.height = gridDimensions.cols*tileDimensions.height + canvasTopAndBottomMargin;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;


const xOffset = centerX - gridDimensions.rows * tileDimensions.width / 2;
const yOffset = centerY - gridDimensions.cols * tileDimensions.height / 2;

const gridOffset = {
    x: xOffset,
    y: yOffset
}

const grid = new TileGrid(gridDimensions, gridOffset, tileDimensions);

//TODO: save path feature?
const path = new Path({x: gridDimensions.rows, y: gridDimensions.cols});
path.setLocation(3, 7);
path.setDestination(0, 0);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//TODO: learn basic game design structure
function gameLoop() {
    return new Promise(() => {
        const currTime = new Date().getTime();
        if (currTime - start > 40) { //TODO: move this kind of stuff to the entity class

            if (path.hasMove()) {
                const p = path.move();
                grid.setTileColor(p.x, p.y, "#FF0000"); // TODO: create a path for a single color may need some more refactor work
            } else if (!path.hasMove()) {
                let startRow = getRandomInt(gridDimensions.rows);
                let startCol = getRandomInt(gridDimensions.cols);
                let endRow = getRandomInt(gridDimensions.rows);
                let endCol = getRandomInt(gridDimensions.rows);
                path.setLocation(startRow, startCol);
                path.setDestination(endRow, endCol); //TODO: path class belongs to the class that needs a path
            }

            grid.draw();
            grid.update();
            start = new Date().getTime();
        }
        return window.requestAnimationFrame(gameLoop);
    });
}
let d = new Date();
let start = d.getTime();

gameLoop();