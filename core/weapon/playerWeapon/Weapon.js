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

    this.shoot = function (x1, y1, x2, y2) {
        if (this.recharged &&
            (this.tempNumberOfCartridges > 0 && this.tempDelayTime === 0) &&
            (x1 + this.range >= x2 && x1 - this.range <= x2 && y1 + this.range >= y2 && y1 - this.range <= y2)
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
}