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

    this.supportedCartridges = [];

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

    this.shoot = function (cartridge, x1, y1, x2, y2) {
        if (this.recharged && this.isCartridgeIsSupported(cartridge) &&
            (this.tempNumberOfCartridges > 0 && this.tempDelayTime === 0)
        ) {
            this.tempNumberOfCartridges--;
            this.tempDelayTime = this.delayTime;
            if (this.tempNumberOfCartridges === 0) {
                this.startRecharge();
            }
            return true;
        }

        return false;
    };

    this.getRechargeTime = function () {
        return this.rechargeTime;
    };

    this.startRecharge = function () {
        this.rechargeDelayTime = this.rechargeTime;
        this.recharged = false;
    };

    this.finishRecharge = function () {
        this.tempNumberOfCartridges = this.numberOfCartridges;
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

    this.isCartridgeIsSupported = function (cartridge) {
        for (var index = 0; index < this.supportedCartridges.length; index++) {
            if (this.supportedCartridges[index] === cartridge.getType()) {
                return true;
            }
        }
        return false;
    };

    this.calculateBulletSpeed = function (cartridge) {
        if (this.isCartridgeIsSupported(cartridge)) {
            return this.getRange() / 10 - cartridge.getSize();
        }
        return 0;
    };

    this.createBulletFromCartridge = function (cartridge, angle) {
        if (this.isCartridgeIsSupported(cartridge)) {
            return new Bullet(this.calculateBulletSpeed(cartridge), angle, cartridge.getSize(), cartridge.getColor(), this.range, cartridge.getDamagePower() + this.getPower());
        }
        throw new Error('Invalid type of cartridges');
    };
}