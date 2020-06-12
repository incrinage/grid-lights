import Entity from "../common/Entity.js";
import Color from "../common/Color.js"
const ctx = document.getElementById('canvas').getContext('2d', { alpha: false });

export default function Tile(dimensions = { width: 1, height: 1 }, color = Color.WHITE) {
    Entity.call(this);
    Tile.prototype = new Entity();
    Tile.prototype.constructor = Tile;

    this.w = dimensions.width;
    this.h = dimensions.height;
    this.color = color;

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}