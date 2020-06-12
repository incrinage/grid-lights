export default function Boundary({x,y}) {

    const xBoundary = x;
    const yBoundary = y;

    this.validLocation = function (point, entityDimensions) {
        const newLocation = {x:point.x, y: point.y};
        if (newLocation.x < 0) newLocation.x = 0;
        if (newLocation.y < 0) newLocation.y = 0;
        if ((newLocation.x + entityDimensions.width) >= xBoundary) newLocation.x = xBoundary - entityDimensions.width;
        if (newLocation.y + entityDimensions.height >= yBoundary) newLocation.y = yBoundary - entityDimensions.height;
        
        return newLocation;
    }

}