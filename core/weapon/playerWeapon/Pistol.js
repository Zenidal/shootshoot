function Pistol() {
    Weapon.apply(this, arguments);
    this.power = 25;
    this.range = 150;
    this.delayTime = 30;
    this.numberOfCartridges = 8;
    this.tempNumberOfCartridges = 8;
    this.rechargeTime = 200;
}

Pistol.prototype = Object.create(Weapon.prototype);
Pistol.prototype.constructor = Pistol;