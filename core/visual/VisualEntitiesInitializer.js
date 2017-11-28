class VisualEntitiesInitializer {
    static createVisualPlayer(gameObj, playerConfig, gameConfig) {
        let visualPlayer = gameObj.newCircleObject({
            x: playerConfig.playerStartPosition.x, y: playerConfig.playerStartPosition.y,
            radius: playerConfig.playerSize / 2,
            strokeColor: 'red',
            strokeWidth: 3,
            fillColor: playerConfig.color
        });
        visualPlayer.player = new Player(gameConfig.getStartWeapon(), playerConfig.playerStartHealth);
        visualPlayer.pouch = gameConfig.getStartPouch();
        return visualPlayer;
    }

    static createVisualBullet(gameObj, startPosition, bullet){
        let visualBullet = gameObj.newCircleObject({
            x: startPosition.x, y: startPosition.y,
            radius: bullet.size,
            fillColor: bullet.color
        });
        visualBullet.bullet = bullet;
        visualBullet.startPosition = startPosition;
        return visualBullet;
    }
}