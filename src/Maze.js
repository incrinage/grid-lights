import Tile from './Tile.js';
import Color from './Color.js';
import LinkedList from './LinkedList.js';

export default function Maze(rows = 0, cols = 0, offsetX = 0, offsetY = 0, drawTiles) {
    this.grid = [];
    this.rows = rows;
    this.cols = cols;
    this.mapColor = Color.WHITE;
    const tileQueue = new LinkedList();
    this.init = function () {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                const t = new Tile();
                t.color = this.mapColor;
                t.x = t.w * i + offsetX;
                t.y = t.h * j + offsetY;
                row.push(t);
            }
            this.grid.push(row);
        }
    }


    this.setTileColor = function (row, col, color) {
        console.log(row, col);

        this.grid[row][col].color = color;
        //check if color is not default grid color
        //also consider many values can still look like each other
        //potentially have a minimum threshold for what looks like 
        //the default color

        //validate colors?
        if (color != this.mapColor) {
            tileQueue.add(this.grid[row][col]);
        }
    }

    let count = 0;
    this.update = function () {
        count++;
        count = count%5;
        if( count < 4) return;

        const size = tileQueue.size == 0? 0: 1;
        for (let i = 0; i < size; i++) {
            let tile = tileQueue.remove();
            if (tile.color != this.mapColor) {
                tile.color = Color.shiftColor(tile.color);
                tileQueue.add(tile);
            }
        }

    }

    this.draw = function () {
        this.grid.forEach((tileRow) => {
            tileRow.forEach(t => t.draw());
        });
    };

  
    this.setObstacle = function(x,y){
        this.grid[x][y].color = 'black';
    }
    
    this.draw = this.draw.bind(this);
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.setObstacle = this.setObstacle.bind(this);
    this.init();
}
