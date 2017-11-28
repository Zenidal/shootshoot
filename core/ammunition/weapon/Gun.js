class Gun extends Weapon {
    constructor() {
        super();
        this._power = 40;
        this._range = 200;
        this._delayTime = 70;
        this._numberOfCartridges = 6;
        this._rechargeTime = 300;
        this._startBulletSpeed = 4;
    }
}