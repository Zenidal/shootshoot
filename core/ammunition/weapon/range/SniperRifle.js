class SniperRifle extends RangeWeapon {
    constructor() {
        super();
        this._power = 50;
        this._range = 450;
        this._delayTime = 60;
        this._numberOfCartridges = 5;
        this._rechargeTime = 250;
        this._startBulletSpeed = 10;
    }
}