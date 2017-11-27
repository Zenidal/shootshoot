function GunExpansiveCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 6;
    this.color = '#FF0000';
    this.damagePower = 25;
    this.type = 'gun-3';
}

GunExpansiveCartridge.prototype = Object.create(Cartridge.prototype);
GunExpansiveCartridge.prototype.constructor = GunExpansiveCartridge;