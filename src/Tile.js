
export default function Tile(dimensions = { width: 1, height: 1 }) {
    const ctx = document.getElementById('canvas').getContext('2d');

    this.x = 0;
    this.y = 0;
    this.w = dimensions.width;
    this.h = dimensions.height;
    this.color = 'teal';

    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

    this.draw = this.draw.bind(this);
}