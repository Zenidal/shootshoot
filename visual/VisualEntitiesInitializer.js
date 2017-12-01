class VisualEntitiesInitializer {
    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    createVisualBullet(bullet, startPosition) {
        let visualBullet = this._gameObject.newCircleObject({
            x: startPosition.x, y: startPosition.y,
            radius: bullet.size,
            fillColor: bullet.color
        });
        visualBullet.bullet = bullet;
        visualBullet.startPosition = startPosition;
        return visualBullet;
    }

    createVisualGrenade(grenade, startPosition, explodePosition) {
        let visualGrenade = this._gameObject.newCircleObject({
            x: startPosition.x, y: startPosition.y,
            radius: grenade.size,
            fillColor: grenade.color,
            strokeWidth: 1,
            strokeColor: 'red'
        });
        visualGrenade.grenade = grenade;
        visualGrenade.startPosition = startPosition;
        visualGrenade.explodePosition = explodePosition;
        return visualGrenade;
    }
}