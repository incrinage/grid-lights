import LinkedList from "./LinkedList";

//TODO: refactor this class since it behaves a lot like an iterator
export default function Path(boundary = {x:1,y:1}) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.paths = new LinkedList();
    let currPath = undefined;

    let id = 1; //TODO: i wanted to track or prioritize figure out if i still want this
    this.setDestination = function (x1, y1) {
        this.paths.add({ end: { x: x1, y: y1, id: id++ } });
    }

    this.setDelta = function (x1, y1, x2, y2) {
        //validate coordinates
        this.dx = getDirection(x2, x1);
        this.dy = getDirection(y2, y1);
    }

    this.setLocation = function (x, y) {
        this.x = x;
        this.y = y;
    }

    this.getDelta = function () {
        return { dx: this.dx, dy: this.dy };
    }

    const getDirection = function (a1, a2) {
        return a2 - a1 == 0 ? 0 : (a2 - a1 > 0 ? -1 : 1);
    }


    this.hasMove = () => currPath || this.paths.getSize() > 0 ? true : false;

    this.move = function () {
        if (!currPath && this.paths.getSize() > 0) currPath = this.paths.remove(); //TODO: get next path? 
        if (!currPath && this.paths.getSize() == 0) return { x: this.x, y: this.y }; //TODO: this is hacky way of getting the last used coordinate when no other coordinate is available

        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x >= boundary.x) this.x = boundary.y-1;
        if (this.y >= boundary.y) this.y = boundary.x -1;
        if (this.x == currPath.end.x && this.y == currPath.end.y) {
            currPath = undefined;
            this.dx = 0;
            this.dy = 0;
            return { x: this.x, y: this.y }
        };
        this.setDelta(this.x, this.y, currPath.end.x, currPath.end.y);
        return { x: this.x, y: this.y };
    }
}