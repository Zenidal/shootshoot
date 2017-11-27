function GameLoop() {
    var pistol = new Pistol();
    var gun = new Gun();
    var automatic = new Automatic();

    var pouches = [
        new Pouch(new PistolSimpleCartridge(), 300, 1000),
        new Pouch(new PistolExpansiveCartridge(), 300, 1000),
        new Pouch(new GunSimpleCartridge(), 150, 1000),
        new Pouch(new GunExpansiveCartridge(), 150, 1000),
        new Pouch(new AutomaticSimpleCartridge(), 600, 1000),
        new Pouch(new AutomaticExpansiveCartridge(), 600, 1000)
    ];

    var visualPlayer = new gameObject.newCircleObject({
        x: 300, y: 300,
        radius: 20,
        strokeColor: 'red',
        strokeWidth: 3,
        fillColor: 'black'
    });
    visualPlayer.player = new Player(pistol, 100);
    visualPlayer.pouch = pouches[0];

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

    var showWeaponArea = function (weapon) {
        var range = weapon.getRange();
        var delayTime = weapon.getTempDelayTime(),
            maxDelayTime = weapon.getDelayTime();
        if (weapon.getRechargeDelayTime()) {
            delayTime = weapon.getRechargeDelayTime();
            maxDelayTime = weapon.getRechargeTime();
        }

        var areaColor = {
                'r': 0,
                'g': Math.round(delayTime / maxDelayTime * 255),
                'b': 0
            },
            areaX = visualPlayer.x + visualPlayer.radius - range,
            areaY = visualPlayer.y + visualPlayer.radius - range;

        brush.drawCircle({
            x: areaX,
            y: areaY,
            radius: range,
            strokeWidth: 2,
            strokeColor: weapon.isCartridgeSupported(weapon.getChargedCartridge()) ? weapon.getChargedCartridge().getColor() : 'rgba(0,0,0,0)',
            fillColor: 'rgba(' + areaColor.r + ',' + areaColor.g + ',' + areaColor.b + ', 0.2)'
        });

        brush.drawCircle({
            x: areaX - 2,
            y: areaY - 2,
            radius: weapon.getRange() + 2,
            strokeWidth: 2,
            strokeColor: visualPlayer.pouch.getCartridge().getColor()
        });
    };

    var attackPlayer = function (visualEnemy) {
        var speedByAxis = Math.random() * 10;
        var isPlayerLeft = visualPlayer.x < visualEnemy.x, isPlayerTop = visualPlayer.y < visualEnemy.y;
        visualEnemy.x = isPlayerLeft ? (visualEnemy.x - speedByAxis) : (visualEnemy.x + speedByAxis);
        visualEnemy.y = isPlayerTop ? (visualEnemy.y - speedByAxis) : (visualEnemy.y + speedByAxis);
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

    var showTotalNumberOfCartridges = function (pouch) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 60,
            text: 'Total number of cartridges: ' + pouch.getTempCount(),
            color: 'white',
            size: 22
        });
    };

    var createBullet = function (startPosition, shotPosition, weapon) {
        var angle = pjs.vector.getAngle2Points(startPosition, shotPosition);
        try {
            var bullet = weapon.createBulletFromCartridge(weapon.getChargedCartridge(), angle);
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

    var getNextPouch = function (pouches, pouch) {
        var currentPosition = pouches.indexOf(pouch);
        var nextPosition = (currentPosition + 1) >= pouches.length ? 0 : currentPosition + 1;
        return pouches[nextPosition];
    };

    var getPrevPouch = function (pouches, pouch) {
        var currentPosition = pouches.indexOf(pouch);
        var previousPosition = (currentPosition - 1) <= 0 ? pouches.length - 1 : currentPosition - 1;
        return pouches[previousPosition];
    };

    this.update = function () {
        gameObject.clear();

        if (mouse.isWheel('UP')) {
            visualPlayer.pouch = getNextPouch(pouches, visualPlayer.pouch);
        }
        if (mouse.isWheel('DOWN')) {
            visualPlayer.pouch = getPrevPouch(pouches, visualPlayer.pouch);
        }
        if (mouse.isDown('LEFT')) {
            if (visualPlayer.player.getWeapon().shootWithAutoReloading(visualPlayer.pouch)) {
                var visualBullet = createBullet(visualPlayer.getPositionC(), mouse.getPosition(), visualPlayer.player.getWeapon());
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

        if (key.isDown('R')) visualPlayer.player.getWeapon().startRecharge(visualPlayer.pouch);

        visualizeGrid(50);
        showEnemiesCount(visualEnemies);
        showNumberOfCartridges(visualPlayer.player.getWeapon());
        showTotalNumberOfCartridges(visualPlayer.pouch);

        pjs.vector.moveCollision(visualPlayer, visualEnemies, visualPlayer.player.getSpeed());
        visualPlayer.player.stop();
        visualPlayer.draw();
        showPlayerHealthBar(visualPlayer);
        showWeaponArea(visualPlayer.player.getWeapon());

        OOP.forArr(visualBullets, function (visualBullet, index, visualBullets) {
            visualBullet.moveAngle(visualBullet.bullet.getSpeed(), visualBullet.bullet.getAngle());
            visualBullet.draw();
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