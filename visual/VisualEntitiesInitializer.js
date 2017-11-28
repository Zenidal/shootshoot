class VisualEntitiesInitializer {
    static createVisualPlayer(player, gameObj, playerConfig, gameConfig) {
        let visualPlayer = gameObj.newCircleObject({
            x: playerConfig.playerStartPosition.x, y: playerConfig.playerStartPosition.y,
            radius: playerConfig.playerSize / 2,
            strokeColor: 'red',
            strokeWidth: 3,
            fillColor: playerConfig.color
        });
        visualPlayer.player = player;
        visualPlayer.pouch = gameConfig.getStartPouch();
        return visualPlayer;
    }

    static createVisualBullet(bullet, gameObj, startPosition){
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