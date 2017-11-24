function Player(playerWeapon, startHealth) {
    var weapon = playerWeapon;
    var health = startHealth;

    this.getWeapon = function () {
        return weapon;
    };

    this.setWeapon = function (playerWeapon) {
        weapon = playerWeapon;
    };

    this.getHealth = function () {
        return health;
    }
}