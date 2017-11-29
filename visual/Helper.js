class Helper{
    static calculateCircleScreenCoordinates(position, radius, strokeWidth){
        let e = point(camera.getStaticBox().x, camera.getStaticBox().y);
        let deltaX = -e.x + radius + (strokeWidth ? strokeWidth / 2 : 0);
        let deltaY = -e.y + radius + (strokeWidth ? strokeWidth / 2 : 0);
        return point(position.x + deltaX, position.y + deltaY);
    }
}