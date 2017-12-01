class RangeWeapon {
    constructor() {
        this._power = 0;
        this._range = 0;
        this._delayTime = 0;
        this._tempDelayTime = 0;
        this._numberOfCartridges = 0;
        this._tempNumberOfCartridges = 0;
        this._rechargeTime = 0;
        this._rechargeDelayTime = 0;
        this._recharged = true;
        this._numberOfChargedCartridges = 0;
        this._chargedCartridge = null;
        this._startBulletSpeed = 0;
    }

    get power() {
        return this._power;
    };

    get range() {
        return this._range;
    };

    get delayTime() {
        return this._delayTime;
    };

    get tempDelayTime() {
        return this._tempDelayTime;
    };

    get numberOfCartridges() {
        return this._numberOfCartridges;
    };

    get tempNumberOfCartridges() {
        return this._tempNumberOfCartridges;
    };

    get rechargeTime() {
        return this._rechargeTime;
    };

    get recharged() {
        return this._recharged;
    };

    get chargedCartridge() {
        return this._chargedCartridge;
    };

    get rechargeDelayTime() {
        return this._rechargeDelayTime;
    };

    decreaseTempDelayTime() {
        if (this._tempDelayTime > 0) this._tempDelayTime--;
    };

    getNumberOfMissingCartridges() {
        return this._numberOfCartridges - this._tempNumberOfCartridges;
    };

    shoot() {
        if (this._recharged && this.isCartridgeSupported(this._chargedCartridge) &&
            (this._tempNumberOfCartridges > 0 && this._tempDelayTime === 0 && this._rechargeDelayTime === 0)
        ) {
            this._tempNumberOfCartridges--;
            this._tempDelayTime = this._delayTime;
            return true;
        }

        return false;
    };

    shootWithAutoReloading(pouch) {
        let shooted = this.shoot();
        if (this._tempNumberOfCartridges === 0) {
            this.startRecharge(pouch);
        }
        return shooted;
    };

    startRecharge(pouch) {
        if (this.isCartridgeSupported(pouch.cartridge) && this._recharged && pouch.tempCount > 0) {
            if (this._chargedCartridge !== pouch.cartridge) {
                this._tempNumberOfCartridges = 0;
                this._chargedCartridge = pouch.cartridge;
            }
            this._numberOfChargedCartridges = pouch.removeCartridges(this.getNumberOfMissingCartridges());
            this._rechargeDelayTime = this._rechargeTime;
            this._recharged = false;
        }
    };

    finishRecharge() {
        this._tempNumberOfCartridges += this._numberOfChargedCartridges;
        this._numberOfChargedCartridges = 0;
        this._recharged = true;
    };

    decreaseRechargeDelayTime() {
        if (this._rechargeDelayTime > 0) {
            this._rechargeDelayTime--;
        }
        if (this._rechargeDelayTime === 0 && !this._recharged) {
            this.finishRecharge();
        }
    };

    isCartridgeSupported(cartridge) {
        if (!cartridge) return false;
        let cartridgeType = cartridge.type.toLowerCase();
        let weaponName = this.constructor.name.toLowerCase();
        return cartridgeType.indexOf(weaponName) >= 0;
    };

    calculateBulletSpeed(cartridge) {
        if (this.isCartridgeSupported(cartridge)) {
            return this._startBulletSpeed + this._range / 10 / cartridge.size;
        }
        return 0;
    };

    createBulletsFromCartridge(cartridge, angle) {
        if (this.isCartridgeSupported(cartridge)) {
            let bullets = [];
            for (let i = 0; i < cartridge.numberOfBullets; i++) {
                let deltaAngle = Math.random() * 10;
                bullets.push(
                    new Bullet(
                        this.calculateBulletSpeed(cartridge), angle + (deltaAngle * (cartridge.numberOfBullets / 2 - i)), cartridge.size, cartridge.color, this._range, cartridge.damagePower + this._power
                    )
                )
            }

            return bullets;
        }
        throw new Error();
    };
}