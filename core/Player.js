class Player {
    constructor(weapon, startHealth, speed) {
        this._weapon = weapon;
        this._health = startHealth;
        this._tempSpeed = point(0, 0);
        this._speed = speed; //it's not point
        this._armor = null;
        this._dead = false;
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

    get tempSpeed() {
        return this._tempSpeed;
    };

    get armor() {
        return this._armor;
    }

    set armor(value) {
        this._armor = value;
    }

    get dead() {
        return this._dead;
    }

    getDamage(damage) {
        if (this._armor) damage = this.armor.getUnprotectedDamage(damage);
        this._health -= damage;
        if (this._health < 0) this._dead = true;
    };

    stop() {
        this._tempSpeed = point(0, 0);
    };

    moveLeft() {
        this._tempSpeed.x = -this._speed;
    };

    moveRight() {
        this._tempSpeed.x = this._speed;
    };

    moveTop() {
        this._tempSpeed.y = -this._speed;
    };

    moveBottom() {
        this._tempSpeed.y = this._speed;
    };
}