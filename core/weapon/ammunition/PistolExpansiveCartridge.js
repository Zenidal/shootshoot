function PistolExpansiveCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 3;
    this.color = '#FFFF00';
    this.damagePower = 15;
    this.type = 'pistol-3';
}

PistolExpansiveCartridge.prototype = Object.create(Cartridge.prototype);
PistolExpansiveCartridge.prototype.constructor = PistolExpansiveCartridge;