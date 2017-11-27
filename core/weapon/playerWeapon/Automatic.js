function Automatic() {
    Weapon.apply(this, arguments);
    this.power = 20;
    this.range = 250;
    this.delayTime = 5;
    this.numberOfCartridges = 30;
    this.rechargeTime = 230;

    this.supportedCartridges = ['automatic-1', 'automatic-3'];
}

Automatic.prototype = Object.create(Weapon.prototype);
Automatic.prototype.constructor = Automatic;