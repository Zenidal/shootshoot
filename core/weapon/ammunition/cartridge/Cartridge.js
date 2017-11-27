function Cartridge() {
    this.size = 0;
    this.damagePower = 0;
    this.type = '';
    this.color = '';

    this.getSize = function () {
        return this.size;
    };

    this.getDamagePower = function () {
        return this.damagePower;
    };

    this.getType = function () {
        return this.type;
    };

    this.getColor = function () {
        return this.color;
    };
}