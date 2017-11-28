class Enemy {
    constructor(startHealth) {
        this._health = startHealth ? startHealth : 0;
        this._dead = false;
    }

    get health() {
        return this._health;
    };

    get dead() {
        return this._dead;
    };

    getDamage(damage) {
        this._health -= damage;
        if (this._health < 0) this._dead = true;
    };
}