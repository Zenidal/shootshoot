class Player {
    constructor(playerWeapon, startHealth) {
        this._weapon = playerWeapon;
        this._health = startHealth;
        this._speed = point(0, 0);
    }

    get weapon() {
        return this._weapon;
    };

    set weapon(playerWeapon) {
        this._weapon = playerWeapon;
    };

    get health() {
        return this._health;
    };

    get speed() {
        return this._speed;
    };

    set speed(playerSpeed) {
        this._speed = playerSpeed;
    };

    stop() {
        this._speed = point(0, 0);
    };

    moveLeft(delta) {
        this._speed.x = -delta;
    };

    moveRight(delta) {
        this._speed.x = delta;
    };

    moveTop(delta) {
        this._speed.y = -delta;
    };

    moveBottom(delta) {
        this._speed.y = delta;
    };
}