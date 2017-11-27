function GunSimpleCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 4;
    this.color = '#FFAAAA';
    this.damagePower = 15;
    this.type = 'gun-1';
}

GunSimpleCartridge.prototype = Object.create(Cartridge.prototype);
GunSimpleCartridge.prototype.constructor = GunSimpleCartridge;