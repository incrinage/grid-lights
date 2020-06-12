export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export const getDelta = function (dir) {
    switch (dir) {
        case UP:
            return { dx: 0, dy: -1 };
        case DOWN:
            return { dx: 0, dy: 1 };
        case LEFT:
            return { dx: -1, dy: 0 };
        case RIGHT:
            return { dx: 1, dy: 0 };
        default:
            return { dx: 0, dy: 0 };
    }
}
export const directions = [UP, DOWN, LEFT, RIGHT];

const directiondMap = new Map();
directiondMap.set("01", DOWN);
directiondMap.set("-10", LEFT);
directiondMap.set("10", RIGHT);
directiondMap.set("0-1", UP);
export const getDirection = function (dirKey) {
    return directiondMap.get(dirKey);
}