function Bullet(bulletSpeed, bulletAngle, bulletSize, bulletColor, bulletMaxRange, bulletDamagePower) {
    var speed = bulletSpeed;
    var angle = bulletAngle;
    var size = bulletSize;
    var color = bulletColor;
    var maxRange = bulletMaxRange;
    var damagePower = bulletDamagePower;

    this.getSpeed = function () {
        return speed;
    };

    this.setSpeed = function (bulletSpeed) {
        speed = bulletSpeed;
    };

    this.getAngle = function () {
        return angle;
    };

    this.setAngle = function (bulletAngle) {
        angle = bulletAngle;
    };

    this.getSize = function () {
        return size;
    };

    this.getColor = function () {
        return color;
    };

    this.getMaxRange = function () {
        return maxRange;
    };

    this.getDamagePower = function () {
        return damagePower * speed / 10;
    };
}