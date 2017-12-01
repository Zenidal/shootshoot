class Cartridge {
    constructor() {
        this._size = 0;
        this._damagePower = 0;
        this._type = '';
        this._color = '';
        this._armorPiercing = 0;
        this._numberOfBullets = 1;
    }

    get numberOfBullets() {
        return this._numberOfBullets;
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

    get armorPiercing() {
        return this._armorPiercing;
    }
}