import Tile from "./Tile.js";
import Color from "../common/Color.js";

export default function GradientTile(dimensions, color = Color.WHITE, targetColor, weight) {
    Tile.call(this, dimensions, color);
    GradientTile.prototype = new Tile();
    GradientTile.prototype.constructor = GradientTile;

    this.update = function (time) {
        if (this.color != targetColor) {
            this.color = Color.gradient(this.color, targetColor, weight);
        }

        return this.color != targetColor;
    };

    this.update = this.update.bind(this);
}