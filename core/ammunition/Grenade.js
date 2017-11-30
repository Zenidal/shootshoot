class Grenade {
    constructor(params){
        this._speed = params.speed;
        this._angle = params.angle;
        this._maxRange = params.maxRange;
        this._rangeOfThrow = params.rangeOfThrow;
        this._damagePower = params.damagePower;
        this._explosionDelay = params.explosionDelay;
        this._explosionArea = params.explosionArea;
        this._exploded = false;
        this._explosionTime = params.explosionTime;
        this._tempExplosionTime = 0;
        this._tempExplosionDelay = 0;
        this._size = params.size;
        this._color = params.color;
        this._explodedColor = params.explodedColor;
        this._timerStarted = false;
        this._destructed = false;

        this._explosionCallbacks = [];
    }

    get speed() {
        return this._speed;
    }

    get angle() {
        return this._angle;
    }

    get rangeOfThrow() {
        return this._rangeOfThrow;
    }

    get maxRange() {
        return this._maxRange;
    }

    get damagePower() {
        return this._damagePower;
    }

    get explosionDelay() {
        return this._explosionDelay;
    }

    get tempExplosionDelay() {
        return this._tempExplosionDelay;
    }

    get exploded() {
        return this._exploded;
    }

    set explosionTime(value) {
        this._explosionTime = value;
    }

    set tempExplosionTime(value) {
        this._tempExplosionTime = value;
    }

    get destructed() {
        return this._destructed;
    }

    get size() {
        return this._size;
    }

    get color() {
        return this._color;
    }

    addExplosionCallback(explosionCallback){
        this._explosionCallbacks.push(explosionCallback);
    }

    executeCallbacks(){
        for(let i = 0; i < this._explosionCallbacks.length; i++){
            this._explosionCallbacks[i].apply(this, [this]);
        }
    }

    startDetonateTimer() {
        if (!this._exploded && !this._timerStarted) {
            this._timerStarted = true;
            this._tempExplosionDelay = this._explosionDelay;
            this._speed = 0;
        }
    }

    decreaseExplosionTimer() {
        if (!this._exploded && this._timerStarted) {
            if (this._tempExplosionDelay > 0) this._tempExplosionDelay--;
            if (this._tempExplosionDelay === 0) {
                this.explode();
            }
        }
    }

    decreaseTempExplosionTime(){
        if(this._exploded && this._tempExplosionTime > 0){
            this._tempExplosionTime--;
        }
        if(this._exploded && this._tempExplosionTime === 0){
            this._destructed = true;
        }
    }

    explode(){
        this._exploded = true;
        this._size = this._explosionArea;
        this._color = this._explodedColor;
        this._tempExplosionTime = this._explosionTime;
        this.executeCallbacks();
    }
}