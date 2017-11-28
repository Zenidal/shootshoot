class Enemy {
    constructor(startHealth) {
        this._health = startHealth ? startHealth : 0;
        this._dead = false;
        this._speed = point(0, 0);
        this._armor = null;
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

    set speed(value) {
        this._speed = value;
    }

    get armor() {
        return this._armor;
    }

    set armor(value) {
        this._armor = value;
    }

    getDamage(damage) {
        if(this._armor) damage = this.armor.getUnprotectedDamage(damage);
        this._health -= damage;
        if (this._health < 0) this._dead = true;
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