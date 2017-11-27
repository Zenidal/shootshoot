function Player(playerWeapon, startHealth) {
    var weapon = playerWeapon;
    var health = startHealth;
    var speed = point(0, 0);

    this.getWeapon = function () {
        return weapon;
    };

    this.setWeapon = function (playerWeapon) {
        weapon = playerWeapon;
    };

    this.getHealth = function () {
        return health;
    };

    this.getSpeed = function () {
        return speed;
    };

    this.setSpeed = function (playerSpeed) {
        speed = playerSpeed;
    };

    this.stop = function () {
        speed = point(0, 0);
    };

    this.moveLeft = function (delta) {
        speed.x = -delta;
    };
    this.moveRight = function (delta) {
        speed.x = delta;
    };
    this.moveTop = function (delta) {
        speed.y = -delta;
    };
    this.moveBottom = function (delta) {
        speed.y = delta;
    };
}