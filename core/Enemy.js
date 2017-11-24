function Enemy(startHealth) {
    var health = startHealth;
    var dead = false;

    this.getHealth = function () {
        return health;
    };

    this.getDamage = function (damage) {
        health -= damage;
        if (health < 0) dead = true;
    };

    this.isDead = function () {
        return dead;
    };
}