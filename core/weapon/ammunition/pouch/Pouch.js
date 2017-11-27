function Pouch(pouchCartridge, pouchCapacity, pouchTempCount) {
    var cartridge = pouchCartridge;
    var capacity = pouchCapacity;
    var tempCount = pouchTempCount > pouchCapacity ? pouchCapacity : pouchTempCount;

    this.getCartridge = function () {
        return cartridge;
    };

    this.getCapacity = function () {
        return capacity;
    };

    this.getTempCount = function () {
        return tempCount;
    };

    this.addCartridges = function (cartridgesCount) {
        if (tempCount + cartridgesCount <= capacity) {
            tempCount += cartridgesCount;
            return cartridgesCount;
        }

        tempCount = capacity;
        return cartridgesCount;
    };

    this.removeCartridges = function (cartridgesCount) {
        if (tempCount - cartridgesCount >= 0) {
            tempCount -= cartridgesCount;
            return cartridgesCount;
        }

        var removedCartridgesCount = tempCount;
        tempCount = 0;
        return removedCartridgesCount;
    };
}