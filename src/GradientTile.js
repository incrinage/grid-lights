import Tile from "./Tile.js";
import Color from "./Color.js";

export default function GradientTile(dimensions, targetColor, weight){
    Tile.call(this, dimensions);
    GradientTile.prototype = new Tile();
    GradientTile.prototype.constructor = GradientTile;
    
    this.update = function (currTime){
        if(this.color != targetColor){
            this.color = Color.gradient(this.color, targetColor, weight);
        }
        return this.color != targetColor;
    };

    this.update = this.update.bind(this);
}