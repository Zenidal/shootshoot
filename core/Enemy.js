class Enemy {
    constructor(startHealth, startSpeed) {
        this._health = startHealth ? startHealth : 0;
        this._dead = false;
        this._tempSpeed = point(0, 0);
        this._armor = null;
        this._speed = startSpeed; //it's not point
    }

    get health() {
        return this._health;
    };

    get dead() {
        return this._dead;
    };

    get speed() {
        return this._speed;
    }

    get tempSpeed() {
        return this._tempSpeed;
    }

    set tempSpeed(value) {
        this._tempSpeed = value;
    }

    get armor() {
        return this._armor;
    }

    set armor(value) {
        this._armor = value;
    }

    getDamage(damage) {
        if (this._armor) damage = this.armor.getUnprotectedDamage(damage);
        this._health -= damage;
        if (this._health < 0) this._dead = true;
    };

    stop() {
        this._tempSpeed = point(0, 0);
    };

    move(vector) {
        this._tempSpeed = vector;
    };

    moveLeft(delta) {
        this._tempSpeed.x = -delta;
    };

    moveRight(delta) {
        this._tempSpeed.x = delta;
    };

    moveTop(delta) {
        this._tempSpeed.y = -delta;
    };

    moveBottom(delta) {
        this._tempSpeed.y = delta;
    };
}