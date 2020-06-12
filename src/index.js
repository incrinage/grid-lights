import View from './common/View.js';
import TrailingTile from './tile/TrailingTile.js';

const view = new View();

const gridDimensions = { width: 2000, height: 2000 };
const boundary = { x: gridDimensions.width, y: gridDimensions.height };
view.setWidth(gridDimensions.width);
view.setHeight(gridDimensions.height);
const tileDimensions = { width: 30, height: 30 };
const tileTrail = new TrailingTile(tileDimensions, boundary, "#ac2a21");
tileTrail.setDelta({dx:1,dy:0});
tileTrail.setLocation({x:0, y:0});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let start = new Date().getTime();

gameLoop();

function gameLoop() {
    return new Promise(() => {
        const currTime = new Date().getTime();
        if (currTime - start > Math.floor(1000/60)) {
            view.drawView();
            tileTrail.update(currTime);
            tileTrail.draw();
            start = new Date().getTime();
        }

        return window.requestAnimationFrame(gameLoop);
    });
}
