const ctx = document.getElementById('canvas').getContext('2d');

export default function Tile(){
    this.x = 0;
    this.y = 0;
    this.w = TILE_WIDTH;
    this.h = TILE_HEIGHT;
    this.color = 'teal';
    this.visit = function(){
        this.onVisit();
    }

    this.onVisit = () => {};

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h );
        ctx.fill();
    }
    this.draw = this.draw.bind(this);
    this.visit = this.visit.bind(this);
    this.onVisit = this.onVisit.bind(this);
}

export const TILE_WIDTH = 50;
export const TILE_HEIGHT = 50;