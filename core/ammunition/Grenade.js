class Grenade {
    constructor(speed, angle, rangeOfThrow, maxRange, damagePower, explosionDelay, explosionArea, size, color, explodedColor) {
        this._speed = speed;
        this._angle = angle;
        this._maxRange = maxRange;
        this._rangeOfThrow = rangeOfThrow;
        this._damagePower = damagePower;
        this._explosionDelay = explosionDelay;
        this._explosionArea = explosionArea;
        this._exploded = false;
        this._tempExplosionDelay = 0;
        this._size = size;
        this._color = color;
        this._explodedColor = explodedColor;
        this._timerStarted = false;
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

    get size() {
        return this._size;
    }

    get color() {
        return this._color;
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
                this._exploded = true;
                this._size = this._explosionArea;
                this._color = this._explodedColor;
            }
        }
    }
}