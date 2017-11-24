function GameLoop() {
    var pistol = new Pistol();
    var gun = new Gun();
    var automatic = new Automatic();

    var visualEnemies = [];
    for (var i = 0; i < 100; i++) {
        var visualEnemy = gameObject.newCircleObject({
            x: 500 + Math.random() * 5000, y: 500 + Math.random() * 5000,
            radius: 10,
            fillColor: 'green'
        });
        visualEnemy.enemy = new Enemy(100);
        visualEnemies.push(visualEnemy);
    }

    var visualPlayer = new gameObject.newCircleObject({
        x: 300, y: 300,
        radius: 20,
        strokeColor: 'red',
        strokeWidth: 3,
        fillColor: 'black'
    });
    visualPlayer.player = new Player(pistol, 100);
    visualPlayer.moveLeft = function (delta) {
        this.x -= delta;
    };
    visualPlayer.moveRight = function (delta) {
        this.x += delta;
    };
    visualPlayer.moveTop = function (delta) {
        this.y -= delta;
    };
    visualPlayer.moveBottom = function (delta) {
        this.y += delta;
    };

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
                pjs.brush.drawRect({
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
        };

        pjs.brush.drawCircle({
            x: visualPlayer.x + visualPlayer.radius - range,
            y: visualPlayer.y + visualPlayer.radius - range,
            radius: range,
            strokeColor: 'white',
            strokeWidth: 1,
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
        pjs.brush.drawRect({
            x: visualEnemy.x,
            y: visualEnemy.y - 10,
            w: healthBarWidth, h: 6,
            strokeColor: 'red',
            strokeWidth: 1
        });
        pjs.brush.drawRect({
            x: visualEnemy.x,
            y: visualEnemy.y - 10,
            w: activeBarWidth, h: 6,
            fillColor: 'red'
        });
    };

    var showPlayerHealthBar = function (visualPlayer) {
        var healthBarWidth = visualPlayer.radius + 20;
        var activeBarWidth = healthBarWidth * visualPlayer.player.getHealth() / 100;
        pjs.brush.drawRect({
            x: visualPlayer.x,
            y: visualPlayer.y - 10,
            w: healthBarWidth, h: 6,
            strokeColor: 'red',
            strokeWidth: 1
        });
        pjs.brush.drawRect({
            x: visualPlayer.x,
            y: visualPlayer.y - 10,
            w: activeBarWidth, h: 6,
            fillColor: 'red'
        });
    };

    var showEnemiesCount = function (visualEnemies) {
        pjs.brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y,
            text: 'Enemies: ' + visualEnemies.length,
            color: 'white',
            size: 22
        });
    };

    var showNumberOfCartridges = function (weapon) {
        pjs.brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 30,
            text: 'Number of cartridges: ' + weapon.getTempNumberOfCartridges(),
            color: 'white',
            size: 22
        });
    };

    this.update = function () {
        gameObject.clear();

        if (mouse.isDown('LEFT')) {
            if (visualPlayer.player.getWeapon().shoot(visualPlayer.x, visualPlayer.y, mouse.getPosition().x, mouse.getPosition().y)) {
                OOP.forEach(visualEnemies, function (visualEnemy, index) {
                    if (mouse.isInObject(visualEnemy)) {
                        visualEnemy.enemy.getDamage(visualPlayer.player.getWeapon().getPower());
                        if (visualEnemy.enemy.isDead()) visualEnemies.splice(index, 1);
                    }
                });
            }
        }
        visualPlayer.player.getWeapon().decreaseTempDelayTime();
        visualPlayer.player.getWeapon().decreaseRechargeDelayTime();

        if (key.isDown('1')) visualPlayer.player.setWeapon(pistol);
        if (key.isDown('2')) visualPlayer.player.setWeapon(gun);
        if (key.isDown('3')) visualPlayer.player.setWeapon(automatic);

        if (key.isDown('W') || key.isDown('UP')) visualPlayer.moveTop(7);
        if (key.isDown('S') || key.isDown('DOWN')) visualPlayer.moveBottom(7);
        if (key.isDown('A') || key.isDown('LEFT')) visualPlayer.moveLeft(7);
        if (key.isDown('D') || key.isDown('RIGHT')) visualPlayer.moveRight(7);

        if (key.isDown('R')) visualPlayer.player.getWeapon().startRecharge();

        visualizeGrid(50);
        showEnemiesCount(visualEnemies);
        showNumberOfCartridges(visualPlayer.player.getWeapon());

        visualPlayer.draw();
        showPlayerHealthBar(visualPlayer);
        showWeaponArea(visualPlayer.player.getWeapon().getRange());
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