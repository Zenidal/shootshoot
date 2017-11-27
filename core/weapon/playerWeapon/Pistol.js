function Pistol() {
    Weapon.apply(this, arguments);
    this.power = 25;
    this.range = 150;
    this.delayTime = 30;
    this.numberOfCartridges = 8;
    this.tempNumberOfCartridges = 8;
    this.rechargeTime = 200;

    this.supportedCartridges = ['pistol-1', 'pistol-3'];
}

Pistol.prototype = Object.create(Weapon.prototype);
Pistol.prototype.constructor = Pistol;