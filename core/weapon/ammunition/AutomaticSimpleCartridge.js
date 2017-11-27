function AutomaticSimpleCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 2;
    this.color = '#AAAAFF';
    this.damagePower = 10;
    this.type = 'automatic-1';
}

AutomaticSimpleCartridge.prototype = Object.create(Cartridge.prototype);
AutomaticSimpleCartridge.prototype.constructor = AutomaticSimpleCartridge;