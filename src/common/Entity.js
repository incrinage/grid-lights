
export default function Entity() {
    let lastUpdateTime = 0;
    let lastDrawTime = 0;
    //hasChange

    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;

    this.setLocation = function (loc) {
        this.x = loc.x;
        this.y = loc.y;
    }

    this.setDelta = function (delta) {
        this.dx = delta.dx;
        this.dy = delta.dy;
    }

    this.draw = () => { };
    this.update = (time) => { };
}


