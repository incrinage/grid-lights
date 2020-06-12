const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: false });

export default function View() {

    this.setWidth = function (w) {
        canvas.width = w;
    }

    this.setHeight = function (h) {
        canvas.height = h;
    }

    this.drawBorder = function () {
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    this.drawBackground = function () {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.clear = function(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    this.drawView = function(){
        this.clear();
        this.drawBackground();
        this.drawBorder();
    }
}