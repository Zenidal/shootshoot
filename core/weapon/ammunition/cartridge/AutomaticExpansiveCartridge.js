function AutomaticExpansiveCartridge() {
    Cartridge.apply(this, arguments);
    this.size = 3;
    this.color = '#0000FF';
    this.damagePower = 15;
    this.type = 'automatic-3';
}

AutomaticExpansiveCartridge.prototype = Object.create(Cartridge.prototype);
AutomaticExpansiveCartridge.prototype.constructor = AutomaticExpansiveCartridge;