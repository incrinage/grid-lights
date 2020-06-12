import Tile from "./Tile";
import { getDelta } from "../common/Direction";
import GradientTile from "./GradientTile";
import Color from "../common/Color";
import Boundary from "../common/Boundary";
import LinkedList from "../common/LinkedList";

export default function TrailingTile(dimensions = { width: 5, height: 5 }, boundaries = { x: 1, y: 1 }, color, weight = .3) {

    Tile.call(this, dimensions, color);
    TrailingTile.prototype = new Tile();
    TrailingTile.prototype.constructor = TrailingTile;

    const updateQueue = new LinkedList();
    const drawQueue = new LinkedList();
    const boundary = new Boundary(boundaries);

    this.dx = dimensions.width;
    this.dy = dimensions.height;

    this.setDirection = function (dir) {
        const d = getDelta(dir);
        const delta = { dx: (Math.abs(this.dx) + dimensions.width) * d.dx, dy: (Math.abs(this.dy) + dimensions.height) * d.dy };
        this.setDelta(delta);
    };

    let prevTime = 0;
    const gravity = 10;
    this.update = function (time) {
        if(time - prevTime > 0){
            //TODO: add collision checks to Physics class, requires getLocation for entities, getDirection (optional?), setSpeed( currently defaults to pixel width)
            const prevLocation = { x: this.x, y: this.y };

            const newLocation = boundary.validLocation({ x: this.x + this.dx, y: this.y + this.dy + gravity }, dimensions);
    
            this.setLocation(newLocation); 
    
            this.updateTrail();
            this.appendToTrail(prevLocation, newLocation);
        }
    };

    this.updateTrail = function() {
        const size = updateQueue.size();
        for (let i = 0; i < size; i++) {
            let t = updateQueue.removeHead();
            if (t.update()) {
                updateQueue.addTail(t);
            }
            drawQueue.addTail(t);
        }
    }

    this.appendToTrail = function(prevLocation, newLocation) {
        if (prevLocation.x != newLocation.x || prevLocation.y != newLocation.y) {
            const gradientTile = new GradientTile(dimensions, color, Color.WHITE, weight);
            gradientTile.setLocation({ x: prevLocation.x, y: prevLocation.y });
            updateQueue.addTail(gradientTile);
            drawQueue.addTail(gradientTile);
       }
    }

    const drawTile = this.draw.bind(this);
    this.draw = function () {
        this.drawTileTrail();
        drawTile();
    }

    this.drawTileTrail = function() {
        const size = drawQueue.size();
        for (let i = 0; i < size; i++) {
            const t = drawQueue.removeHead();
            t.draw();
        }
    }
}




