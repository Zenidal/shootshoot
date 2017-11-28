class Pouch {
    constructor(pouchCartridge, pouchCapacity, pouchTempCount) {
        this._cartridge = pouchCartridge;
        this._capacity = pouchCapacity;
        this._tempCount = pouchTempCount > pouchCapacity ? pouchCapacity : pouchTempCount;
    }

    get cartridge() {
        return this._cartridge;
    };

    get capacity() {
        return this._capacity;
    };

    get tempCount() {
        return this._tempCount;
    };

    addCartridges(cartridgesCount) {
        if (this._tempCount + cartridgesCount <= capacity) {
            this._tempCount += cartridgesCount;
            return cartridgesCount;
        }

        this._tempCount = capacity;
        return cartridgesCount;
    };

    removeCartridges(cartridgesCount) {
        if (this._tempCount - cartridgesCount >= 0) {
            this._tempCount -= cartridgesCount;
            return cartridgesCount;
        }

        let removedCartridgesCount = tempCount;
        this._tempCount = 0;
        return removedCartridgesCount;
    };
}