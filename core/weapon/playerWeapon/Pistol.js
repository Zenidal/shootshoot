class Pistol extends Weapon {
    constructor() {
        super();
        this._power = 25;
        this._range = 150;
        this._delayTime = 30;
        this._numberOfCartridges = 8;
        this._rechargeTime = 200;
    }
}