function PistolSimpleCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 2;
    this.color = '#DDFF00';
    this.damagePower = 5;
    this.type = 'pistol-1';
}

PistolSimpleCartridge.prototype = Object.create(Cartridge.prototype);
PistolSimpleCartridge.prototype.constructor = PistolSimpleCartridge;