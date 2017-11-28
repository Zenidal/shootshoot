 class Cartridge {
    constructor() {
        this._size = 0;
        this._damagePower = 0;
        this._type = '';
        this._color = '';
    }

    get size() {
        return this._size;
    };

    get damagePower() {
        return this._damagePower;
    };

    get type() {
        return this._type;
    };

    get color() {
        return this._color;
    };
};