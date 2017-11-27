function GameLoop() {
    var pistol = new Pistol();
    var gun = new Gun();
    var automatic = new Automatic();

    var cartridges = [new PistolSimpleCartridge(), new PistolExpansiveCartridge(), new GunSimpleCartridge(), new AutomaticSimpleCartridge()];

    var visualEnemies = [];
    var visualBullets = [];
    OOP.fillArr(visualEnemies, 100, function () {
        var visualEnemy = gameObject.newCircleObject({
            x: 500 + Math.random() * 5000, y: 500 + Math.random() * 5000,
            radius: 10,
            fillColor: 'green'
        });
        visualEnemy.enemy = new Enemy(100);
        return visualEnemy;
    });

    var visualPlayer = new gameObject.newCircleObject({
        x: 300, y: 300,
        radius: 20,
        strokeColor: 'red',
        strokeWidth: 3,
        fillColor: 'black'
    });

    visualPlayer.player = new Player(pistol, 100);
    visualPlayer.cartridge = cartridges[0];

    var visualizeGrid = function (cellSize) {
        var startCameraX = camera.getPosition().x,
            endCameraX = camera.getPosition().x + (camera.getPositionC().x - camera.getPosition().x) * 2,
            startCameraY = camera.getPosition().y,
            endCameraY = camera.getPosition().y + (camera.getPositionC().y - camera.getPosition().y) * 2;
        var horizontalCellCount = Math.ceil((endCameraX - startCameraX) / cellSize),
            verticalCellCount = Math.ceil((endCameraY - startCameraY) / cellSize);
        var startX = Math.floor(startCameraX / cellSize) * cellSize,
            startY = Math.floor(startCameraY / cellSize) * cellSize;
        for (var row = 0; row < verticalCellCount; row++) {
            for (var column = 0; column < horizontalCellCount; column++) {
                brush.drawRect({
                    x: startX + cellSize * column,
                    y: startY + cellSize * row,
                    w: cellSize, h: cellSize,
                    strokeColor: 'green',
                    strokeWidth: 1
                });
            }
        }
    };

    var showWeaponArea = function (range) {
        var delayTime = visualPlayer.player.getWeapon().getTempDelayTime(),
            maxDelayTime = visualPlayer.player.getWeapon().getDelayTime();
        if (visualPlayer.player.getWeapon().getRechargeDelayTime()) {
            delayTime = visualPlayer.player.getWeapon().getRechargeDelayTime();
            maxDelayTime = visualPlayer.player.getWeapon().getRechargeTime();
        }

        var areaColor = {
            'r': 0,
            'g': Math.round(delayTime / maxDelayTime * 255),
            'b': 0
        }, areaX = visualPlayer.x + visualPlayer.radius - range, areaY = visualPlayer.y + visualPlayer.radius - range;

        brush.drawCircle({
            x: areaX,
            y: areaY,
            radius: range,
            strokeWidth: 2,
            strokeColor: visualPlayer.player.getWeapon().isCartridgeIsSupported(visualPlayer.cartridge) ? visualPlayer.cartridge.getColor() : 'rgba(0,0,0,0)',
            fillColor: 'rgba(' + areaColor.r + ',' + areaColor.g + ',' + areaColor.b + ', 0.5)'
        });
    };

    var attackPlayer = function (enemy) {
        var speedByAxis = Math.random() * 10;
        var isPlayerLeft = visualPlayer.x < enemy.x, isPlayerTop = visualPlayer.y < enemy.y;
        enemy.x = isPlayerLeft ? (enemy.x - speedByAxis) : (enemy.x + speedByAxis);
        enemy.y = isPlayerTop ? (enemy.y - speedByAxis) : (enemy.y + speedByAxis);
    };

    var showEnemyHealthBar = function (visualEnemy) {
        var healthBarWidth = visualEnemy.radius + 10;
        var activeBarWidth = healthBarWidth * visualEnemy.enemy.getHealth() / 100;
        brush.drawRect({
            x: visualEnemy.x,
            y: visualEnemy.y - 10,
            w: healthBarWidth, h: 6,
            strokeColor: 'red',
            strokeWidth: 1
        });
        brush.drawRect({
            x: visualEnemy.x,
            y: visualEnemy.y - 10,
            w: activeBarWidth, h: 6,
            fillColor: 'red'
        });
    };

    var showPlayerHealthBar = function (visualPlayer) {
        var healthBarWidth = visualPlayer.radius + 20;
        var activeBarWidth = healthBarWidth * visualPlayer.player.getHealth() / 100;
        brush.drawRect({
            x: visualPlayer.x,
            y: visualPlayer.y - 10,
            w: healthBarWidth, h: 6,
            strokeColor: 'red',
            strokeWidth: 1
        });
        brush.drawRect({
            x: visualPlayer.x,
            y: visualPlayer.y - 10,
            w: activeBarWidth, h: 6,
            fillColor: 'red'
        });
    };

    var showEnemiesCount = function (visualEnemies) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y,
            text: 'Enemies: ' + visualEnemies.length,
            color: 'white',
            size: 22
        });
    };

    var showNumberOfCartridges = function (weapon) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 30,
            text: 'Number of cartridges: ' + weapon.getTempNumberOfCartridges(),
            color: 'white',
            size: 22
        });
    };

    var showCartridgeType = function (cartridge) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 60,
            text: 'Cartridge: ' + cartridge.getType(),
            color: 'white',
            size: 22
        });
    };

    var createBullet = function (visualPlayer, shotPosition) {
        var angle = pjs.vector.getAngle2Points(visualPlayer.getPositionC(), shotPosition);
        var startPosition = visualPlayer.getPositionC();
        try {
            var bullet = new visualPlayer.player.getWeapon().createBulletFromCartridge(visualPlayer.cartridge, angle);
        } catch (error) {
            log('Please change cartridges.');
            return null;
        }
        var visualBullet = new gameObject.newCircleObject({
            x: startPosition.x, y: startPosition.y,
            radius: bullet.getSize(),
            fillColor: bullet.getColor()
        });
        visualBullet.bullet = bullet;
        visualBullet.startPosition = startPosition;
        return visualBullet;
    };

    this.update = function () {
        gameObject.clear();

        if (mouse.isWheel('UP')) {
            var currentPosition = cartridges.indexOf(visualPlayer.cartridge);
            var nextPosition = (currentPosition + 1) >= cartridges.length ? 0 : currentPosition + 1;
            visualPlayer.cartridge = cartridges[nextPosition];
        }
        if (mouse.isWheel('DOWN')) {
            var currentPosition = cartridges.indexOf(visualPlayer.cartridge);
            var previousPosition = (currentPosition - 1) <= 0 ? cartridges.length - 1 : currentPosition - 1;
            visualPlayer.cartridge = cartridges[previousPosition];
        }
        if (mouse.isDown('LEFT')) {
            if (visualPlayer.player.getWeapon().shoot(visualPlayer.cartridge, visualPlayer.x, visualPlayer.y, mouse.getPosition().x, mouse.getPosition().y)) {
                var visualBullet = createBullet(visualPlayer, mouse.getPosition());
                if (visualBullet) {
                    visualBullets.push(visualBullet);
                }
            }
        }
        visualPlayer.player.getWeapon().decreaseTempDelayTime();
        visualPlayer.player.getWeapon().decreaseRechargeDelayTime();

        if (key.isDown('1')) visualPlayer.player.setWeapon(pistol);
        if (key.isDown('2')) visualPlayer.player.setWeapon(gun);
        if (key.isDown('3')) visualPlayer.player.setWeapon(automatic);

        if (key.isDown('W') || key.isDown('UP')) visualPlayer.player.moveTop(7);
        if (key.isDown('S') || key.isDown('DOWN')) visualPlayer.player.moveBottom(7);
        if (key.isDown('A') || key.isDown('LEFT')) visualPlayer.player.moveLeft(7);
        if (key.isDown('D') || key.isDown('RIGHT')) visualPlayer.player.moveRight(7);

        if (key.isDown('R')) visualPlayer.player.getWeapon().startRecharge();

        pjs.vector.moveCollision(visualPlayer, visualEnemies, visualPlayer.player.getSpeed());
        visualPlayer.player.stop();

        visualizeGrid(50);
        showEnemiesCount(visualEnemies);
        showNumberOfCartridges(visualPlayer.player.getWeapon());

        visualPlayer.draw();
        showPlayerHealthBar(visualPlayer);
        showWeaponArea(visualPlayer.player.getWeapon().getRange());

        OOP.drawArr(visualBullets, function (visualBullet) {
            visualBullet.moveAngle(visualBullet.bullet.getSpeed(), visualBullet.bullet.getAngle());
        });
        OOP.forArr(visualBullets, function (visualBullet, index, visualBullets) {
            var visualEnemy = visualBullet.isArrIntersect(visualEnemies);
            if (visualEnemy) {
                visualBullets.splice(index, 1);
                visualEnemy.enemy.getDamage(visualBullet.bullet.getDamagePower());
                if (visualEnemy.enemy.isDead()) {
                    visualEnemies.splice(visualEnemies.indexOf(visualEnemy), 1);
                }
            }
            if (pjs.vector.getDistance(visualBullet.startPosition, visualBullet.getPositionC()) >= visualBullet.bullet.getMaxRange()) {
                visualBullets.splice(index, 1);
            }
        });

        OOP.drawArr(visualEnemies, function (enemy) {
            showEnemyHealthBar(enemy);
            attackPlayer(enemy);
            if (enemy.isStaticIntersect(visualPlayer)) {
                pjs.game.stop();
            }
        }.bind(this));

        camera.follow(visualPlayer, 30);
    };
}