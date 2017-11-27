function Weapon() {
    this.power = 0;
    this.range = 0;
    this.delayTime = 0;
    this.tempDelayTime = 0;
    this.numberOfCartridges = 0;
    this.tempNumberOfCartridges = 0;
    this.rechargeTime = 0;
    this.rechargeDelayTime = 0;
    this.recharged = true;
    this.numberOfChargedCartridges = 0;
    this.chargedCartridge = null;

    this.getPower = function () {
        return this.power;
    };

    this.getRange = function () {
        return this.range;
    };

    this.getDelayTime = function () {
        return this.delayTime;
    };

    this.getTempDelayTime = function () {
        return this.tempDelayTime;
    };

    this.decreaseTempDelayTime = function () {
        if (this.tempDelayTime > 0) this.tempDelayTime--;
    };

    this.getNumberOfCartridges = function () {
        return this.numberOfCartridges;
    };

    this.getTempNumberOfCartridges = function () {
        return this.tempNumberOfCartridges;
    };

    this.getNumberOfMissingCartridges = function () {
        return this.numberOfCartridges - this.tempNumberOfCartridges;
    };

    this.shoot = function () {
        if (this.recharged && this.isCartridgeSupported(this.chargedCartridge) &&
            (this.tempNumberOfCartridges > 0 && this.tempDelayTime === 0 && this.rechargeDelayTime === 0)
        ) {
            this.tempNumberOfCartridges--;
            this.tempDelayTime = this.delayTime;
            return true;
        }

        return false;
    };

    this.shootWithAutoReloading = function(pouch){
        var shooted = this.shoot();
        if (this.tempNumberOfCartridges === 0) {
            this.startRecharge(pouch);
        }
        return shooted;
    };

    this.getRechargeTime = function () {
        return this.rechargeTime;
    };

    this.startRecharge = function (pouch) {
        if (this.isCartridgeSupported(pouch.getCartridge()) && this.recharged && pouch.getTempCount() > 0) {
            if (this.chargedCartridge !== pouch.getCartridge()) {
                this.tempNumberOfCartridges = 0;
                this.chargedCartridge = pouch.getCartridge();
            }
            this.numberOfChargedCartridges = pouch.removeCartridges(this.getNumberOfMissingCartridges());
            this.rechargeDelayTime = this.rechargeTime;
            this.recharged = false;
        }
    };

    this.finishRecharge = function () {
        this.tempNumberOfCartridges += this.numberOfChargedCartridges;
        this.numberOfChargedCartridges = 0;
        this.recharged = true;
    };

    this.getRechargeDelayTime = function () {
        return this.rechargeDelayTime;
    };

    this.decreaseRechargeDelayTime = function () {
        if (this.rechargeDelayTime > 0) {
            this.rechargeDelayTime--;
        }
        if (this.rechargeDelayTime === 0 && !this.recharged) {
            this.finishRecharge();
        }
    };

    this.isRecharged = function () {
        return this.recharged;
    };

    this.getChargedCartridge = function () {
        return this.chargedCartridge;
    };

    this.isCartridgeSupported = function (cartridge) {
        if (!cartridge) return false;
        var cartridgeType = cartridge.getType().toLowerCase();
        var weaponName = this.constructor.name.toLowerCase();
        return cartridgeType.indexOf(weaponName) >= 0;
    };

    this.calculateBulletSpeed = function (cartridge) {
        if (this.isCartridgeSupported(cartridge)) {
            return this.getRange() / 10 - cartridge.getSize();
        }
        return 0;
    };

    this.createBulletFromCartridge = function (cartridge, angle) {
        if (this.isCartridgeSupported(cartridge)) {
            return new Bullet(this.calculateBulletSpeed(cartridge), angle, cartridge.getSize(), cartridge.getColor(), this.range, cartridge.getDamagePower() + this.getPower());
        }
        throw new Error();
    };
}