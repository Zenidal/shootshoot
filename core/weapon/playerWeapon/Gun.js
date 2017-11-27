function Gun() {
    Weapon.apply(this, arguments);
    this.power = 40;
    this.range = 200;
    this.delayTime = 70;
    this.numberOfCartridges = 6;
    this.tempNumberOfCartridges = 6;
    this.rechargeTime = 300;

    this.supportedCartridges = ['gun-1'];
}

Gun.prototype = Object.create(Weapon.prototype);
Gun.prototype.constructor = Gun;