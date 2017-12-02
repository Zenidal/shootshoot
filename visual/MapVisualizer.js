class MapVisualizer {
    constructor(visualMap) {
        this._visualMap = visualMap;
    }

    init() {
        for (let index = 0; index < this._visualMap.groundObjects.length; index++) {
            this._visualMap.groundObjects[index].fillColor = 'brown';
            // this._visualMap.swampObjects[index].strokeWidth = 1;
            // this._visualMap.swampObjects[index].strokeStyle = 'gray';
        }
        for (let index = 0; index < this._visualMap.wallObjects.length; index++) {
            this._visualMap.wallObjects[index].fillColor = 'black';
            this._visualMap.wallObjects[index].strokeWidth = 1;
            this._visualMap.wallObjects[index].strokeStyle = 'gray';
        }
        for (let index = 0; index < this._visualMap.waterObjects.length; index++) {
            this._visualMap.waterObjects[index].fillColor = 'rgb(0, 0, 255)';
            // this._visualMap.waterObjects[index].strokeWidth = 1;
            // this._visualMap.waterObjects[index].strokeStyle = 'gray';
        }
        for (let index = 0; index < this._visualMap.bridgeObjects.length; index++) {
            this._visualMap.bridgeObjects[index].fillColor = 'gray';
            // this._visualMap.bridgeObjects[index].strokeWidth = 1;
            // this._visualMap.bridgeObjects[index].strokeStyle = 'gray';
        }
        for (let index = 0; index < this._visualMap.swampObjects.length; index++) {
            this._visualMap.swampObjects[index].fillColor = 'green';
            // this._visualMap.swampObjects[index].strokeWidth = 1;
            // this._visualMap.swampObjects[index].strokeStyle = 'gray';
        }
    }

    visualize(camera) {
        for (let index = 0; index < this._visualMap.groundObjects.length; index++) {
            if(this._visualMap.groundObjects[index].isInCameraStatic()) this._visualMap.groundObjects[index].draw();
        }
        for (let index = 0; index < this._visualMap.wallObjects.length; index++) {
            if(this._visualMap.wallObjects[index].isInCameraStatic()) this._visualMap.wallObjects[index].draw();
        }
        for (let index = 0; index < this._visualMap.waterObjects.length; index++) {
            if(this._visualMap.waterObjects[index].isInCameraStatic()) this._visualMap.waterObjects[index].draw();
        }
        for (let index = 0; index < this._visualMap.bridgeObjects.length; index++) {
            if(this._visualMap.bridgeObjects[index].isInCameraStatic()) this._visualMap.bridgeObjects[index].draw();
        }
        for (let index = 0; index < this._visualMap.swampObjects.length; index++) {
            if(this._visualMap.swampObjects[index].isInCameraStatic()) this._visualMap.swampObjects[index].draw();
        }
    }

    visualizeGrid(brush, camera, color, width) {
        if (!width) width = 1;
        if (!color) color = 'green';

        let startCameraX = camera.getPosition().x,
            endCameraX = camera.getPosition().x + (camera.getPositionC().x - camera.getPosition().x) * 2,
            startCameraY = camera.getPosition().y,
            endCameraY = camera.getPosition().y + (camera.getPositionC().y - camera.getPosition().y) * 2;
        let horizontalCellCount = Math.ceil((endCameraX - startCameraX) / this._visualMap.sellSize),
            verticalCellCount = Math.ceil((endCameraY - startCameraY) / this._visualMap.sellSize);
        let startX = Math.floor(startCameraX / this._visualMap.sellSize) * this._visualMap.sellSize,
            startY = Math.floor(startCameraY / this._visualMap.sellSize) * this._visualMap.sellSize;
        for (let row = 0; row < verticalCellCount; row++) {
            for (let column = 0; column < horizontalCellCount; column++) {
                brush.drawRect({
                    x: startX + this._visualMap.sellSize * column,
                    y: startY + this._visualMap.sellSize * row,
                    w: this._visualMap.sellSize, h: this._visualMap.sellSize,
                    strokeColor: color,
                    strokeWidth: width
                });
            }
        }
    };
}