class Bullet {
    constructor(bulletSpeed, bulletAngle, bulletSize, bulletColor, bulletMaxRange, bulletDamagePower) {
        this._speed = bulletSpeed;
        this._angle = bulletAngle;
        this._size = bulletSize;
        this._color = bulletColor;
        this._maxRange = bulletMaxRange;
        this._damagePower = bulletDamagePower;
    }

    get speed() {
        return this._speed;
    };

    set speed(bulletSpeed) {
        this._speed = bulletSpeed;
    };

    get angle() {
        return this._angle;
    };

    set angle(bulletAngle) {
        this._angle = bulletAngle;
    };

    get size() {
        return this._size;
    };

    get color() {
        return this._color;
    };

    get maxRange() {
        return this._maxRange;
    };

    get damagePower() {
        return this._damagePower * this._speed / 10;
    };
}