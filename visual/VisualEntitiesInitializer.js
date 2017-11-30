class VisualEntitiesInitializer {
    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    createVisualPlayer(player, playerConfig, gameConfig) {
        let visualPlayer = this._gameObject.newCircleObject({
            x: playerConfig.playerStartPosition.x, y: playerConfig.playerStartPosition.y,
            radius: playerConfig.playerSize / 2,
            strokeColor: 'red',
            strokeWidth: 3,
            fillColor: playerConfig.color,
        });
        visualPlayer.player = player;
        visualPlayer.pouch = gameConfig.getStartPouch();
        visualPlayer.grenadeDelay = playerConfig._grenadeDelay;
        visualPlayer.tempGrenadeDelay = 0;
        visualPlayer.initializeGrenadeDelayTimer = function () {
            this.tempGrenadeDelay = this.grenadeDelay;
        }.bind(visualPlayer);
        visualPlayer.decreaseGrenadeDelay = function () {
            if (this.tempGrenadeDelay > 0) this.tempGrenadeDelay--;
        }.bind(visualPlayer);
        return visualPlayer;
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
            fillColor: grenade.color
        });
        visualGrenade.grenade = grenade;
        visualGrenade.startPosition = startPosition;
        visualGrenade.explodePosition = explodePosition;
        return visualGrenade;
    }
}