class RangeWeapon {
    constructor() {
        this._power = 0;
        this._range = 0;
        this._delayTime = 0;
        this._tempDelayTime = 0;
        this._swingTime = 0;
        this._tempSwingTime = 0;
    }

    get power() {
        return this._power;
    }

    get range() {
        return this._range;
    }

    get delayTime() {
        return this._delayTime;
    }

    get tempDelayTime() {
        return this._tempDelayTime;
    }

    get swingTime() {
        return this._swingTime;
    }

    get tempSwingTime() {
        return this._tempSwingTime;
    }

    canAttack(){
        return this._swingTime === 0 && this._tempDelayTime === 0;
    }

    decreaseTimers() {
        if (this._tempDelayTime > 0) this._tempDelayTime--;
        if (this._tempSwingTime > 0) this._tempDelayTime--;
    };

    attack(){
        if(this.canAttack()){
            this._tempSwingTime = this._swingTime;
            this._tempDelayTime = this._delayTime;
        }
    };
}