class VisualMap {
    constructor(map, sellSize) {
        this._map = map;
        this._sellSize = sellSize;
        this._wallObjecs = [];
        this._waterObjects = [];
        this._bridgeObjects = [];
        this._swampObjects = [];
        this._groundObjects = [];

        this._groundKey = '0';
        this._wallKey = '1';
        this._waterKey = '2';
        this._bridgeKey = '3';
        this._swampKey = '4';
    }

    get sellSize() {
        return this._sellSize;
    }

    get groundObjects() {
        return this._groundObjects;
    }

    get wallObjects() {
        return this._wallObjecs;
    }

    get waterObjects() {
        return this._waterObjects;
    }

    get bridgeObjects() {
        return this._bridgeObjects;
    }

    get swampObjects() {
        return this._swampObjects;
    }

    getObstaclesObjects(){
        return this._wallObjecs.concat(this._waterObjects);
    }

    init(gameObject) {
        for (let row = 0; row < this._map.length; row++) {
            for (let column = 0; column < this._map[row].length; column++) {
                let targetArray = null;
                switch (this._map[row][column]) {
                    case this._groundKey:
                        targetArray = this._groundObjects;
                        break;
                    case this._wallKey:
                        targetArray = this._wallObjecs;
                        break;
                    case this._waterKey:
                        targetArray = this._waterObjects;
                        break;
                    case this._bridgeKey:
                        targetArray = this._bridgeObjects;
                        break;
                    case this._swampKey:
                        targetArray = this._swampObjects;
                        break;
                }

                if(Array.isArray(targetArray)){
                    targetArray.push(gameObject.newRectObject({
                        x: column * this._sellSize,
                        y: row * this._sellSize,
                        w: this._sellSize,
                        h: this._sellSize
                    }));
                }
            }
        }
    }
}