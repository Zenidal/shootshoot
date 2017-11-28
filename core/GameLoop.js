let pjs = new PointJS(window.innerWidth, window.innerHeight, {
    backgroundColor: '#4b4843' // optional
});
pjs.system.setTitle('PointJS'); // Set Title for Tab or Window

// pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

let log = pjs.system.log; // log = console.log;
let gameObject = pjs.game; // Game Manager
let camera = pjs.camera; // Camera Manager
let brush = pjs.brush; // Brush, used for simple drawing
let OOP = pjs.OOP; // Objects manager
let key = pjs.keyControl;
let mouse = pjs.mouseControl;

key.initKeyControl();
mouse.initMouseControl();

let point = pjs.vector.point; // Constructor for Point
let width = gameObject.getWH().w; // width of scene viewport
let height = gameObject.getWH().h; // height of scene viewport

// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

gameObject.newLoopFromClassObject('game', new gameLoop());

gameObject.startLoop('game');

function gameLoop() {
    let pistol = new Pistol();
    let gun = new Gun();
    let automatic = new Automatic();

    let pouches = [
        new Pouch(new PistolSimpleCartridge(), 300, 1000),
        new Pouch(new PistolExpansiveCartridge(), 300, 1000),
        new Pouch(new GunSimpleCartridge(), 150, 1000),
        new Pouch(new GunExpansiveCartridge(), 150, 1000),
        new Pouch(new AutomaticSimpleCartridge(), 600, 1000),
        new Pouch(new AutomaticExpansiveCartridge(), 600, 1000)
    ];

    let visualPlayer = new gameObject.newCircleObject({
        x: 300, y: 300,
        radius: 20,
        strokeColor: 'red',
        strokeWidth: 3,
        fillColor: 'black'
    });
    visualPlayer.player = new Player(pistol, 100);
    visualPlayer.pouch = pouches[0];

    let visualEnemies = [];
    let visualBullets = [];
    OOP.fillArr(visualEnemies, 100, function () {
        let visualEnemy = gameObject.newCircleObject({
            x: 500 + Math.random() * 5000, y: 500 + Math.random() * 5000,
            radius: 10,
            fillColor: 'green'
        });
        visualEnemy.enemy = new Enemy(100);
        return visualEnemy;
    });

    let visualizeGrid = function (cellSize) {
        let startCameraX = camera.getPosition().x,
            endCameraX = camera.getPosition().x + (camera.getPositionC().x - camera.getPosition().x) * 2,
            startCameraY = camera.getPosition().y,
            endCameraY = camera.getPosition().y + (camera.getPositionC().y - camera.getPosition().y) * 2;
        let horizontalCellCount = Math.ceil((endCameraX - startCameraX) / cellSize),
            verticalCellCount = Math.ceil((endCameraY - startCameraY) / cellSize);
        let startX = Math.floor(startCameraX / cellSize) * cellSize,
            startY = Math.floor(startCameraY / cellSize) * cellSize;
        for (let row = 0; row < verticalCellCount; row++) {
            for (let column = 0; column < horizontalCellCount; column++) {
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

    let showWeaponArea = function (weapon) {
        let range = weapon.range;
        let delayTime = weapon.tempDelayTime,
            maxDelayTime = weapon.delayTime;
        if (weapon.rechargeDelayTime) {
            delayTime = weapon.rechargeDelayTime;
            maxDelayTime = weapon.rechargeTime;
        }

        let areaColor = {
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
            strokeColor: weapon.isCartridgeSupported(weapon.chargedCartridge) ? weapon.chargedCartridge.color : 'rgba(0,0,0,0)',
            fillColor: 'rgba(' + areaColor.r + ',' + areaColor.g + ',' + areaColor.b + ', 0.2)'
        });

        brush.drawCircle({
            x: areaX - 2,
            y: areaY - 2,
            radius: weapon.range + 2,
            strokeWidth: 2,
            strokeColor: visualPlayer.pouch.cartridge.color
        });
    };

    let attackPlayer = function (visualEnemy) {
        let speedByAxis = Math.random() * 10;
        let isPlayerLeft = visualPlayer.x < visualEnemy.x, isPlayerTop = visualPlayer.y < visualEnemy.y;
        visualEnemy.x = isPlayerLeft ? (visualEnemy.x - speedByAxis) : (visualEnemy.x + speedByAxis);
        visualEnemy.y = isPlayerTop ? (visualEnemy.y - speedByAxis) : (visualEnemy.y + speedByAxis);
    };

    let showEnemyHealthBar = function (visualEnemy) {
        let healthBarWidth = visualEnemy.radius + 10;
        let activeBarWidth = healthBarWidth * visualEnemy.enemy.health / 100;
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

    let showPlayerHealthBar = function (visualPlayer) {
        let healthBarWidth = visualPlayer.radius + 20;
        let activeBarWidth = healthBarWidth * visualPlayer.player.health / 100;
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

    let showEnemiesCount = function (visualEnemies) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y,
            text: 'Enemies: ' + visualEnemies.length,
            color: 'white',
            size: 22
        });
    };

    let showNumberOfCartridges = function (weapon) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 30,
            text: 'Number of cartridges: ' + weapon.tempNumberOfCartridges,
            color: 'white',
            size: 22
        });
    };

    let showTotalNumberOfCartridges = function (pouch) {
        brush.drawText({
            x: camera.getPosition().x,
            y: camera.getPosition().y + 60,
            text: 'Total number of cartridges: ' + pouch.tempCount,
            color: 'white',
            size: 22
        });
    };

    let createBullet = function (startPosition, shotPosition, weapon) {
        let angle = pjs.vector.getAngle2Points(startPosition, shotPosition);
        try {
            let bullet = weapon.createBulletFromCartridge(weapon.chargedCartridge, angle);
            let visualBullet = new gameObject.newCircleObject({
                x: startPosition.x, y: startPosition.y,
                radius: bullet.size,
                fillColor: bullet.color
            });
            visualBullet.bullet = bullet;
            visualBullet.startPosition = startPosition;
            return visualBullet;
        } catch (error) {
            log('Please change cartridges.');
            log(error);
            return null;
        }
    };

    let getNextPouch = function (pouches, pouch) {
        let currentPosition = pouches.indexOf(pouch);
        let nextPosition = (currentPosition + 1) >= pouches.length ? 0 : currentPosition + 1;
        return pouches[nextPosition];
    };

    let getPrevPouch = function (pouches, pouch) {
        let currentPosition = pouches.indexOf(pouch);
        let previousPosition = (currentPosition - 1) <= 0 ? pouches.length - 1 : currentPosition - 1;
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
            if (visualPlayer.player.weapon.shootWithAutoReloading(visualPlayer.pouch)) {
                let visualBullet = createBullet(visualPlayer.getPositionC(), mouse.getPosition(), visualPlayer.player.weapon);
                if (visualBullet) {
                    visualBullets.push(visualBullet);
                }
            }
        }

        visualPlayer.player.weapon.decreaseTempDelayTime();
        visualPlayer.player.weapon.decreaseRechargeDelayTime();

        if (key.isDown('1')) visualPlayer.player.weapon = pistol;
        if (key.isDown('2')) visualPlayer.player.weapon = gun;
        if (key.isDown('3')) visualPlayer.player.weapon = automatic;

        if (key.isDown('W') || key.isDown('UP')) visualPlayer.player.moveTop(7);
        if (key.isDown('S') || key.isDown('DOWN')) visualPlayer.player.moveBottom(7);
        if (key.isDown('A') || key.isDown('LEFT')) visualPlayer.player.moveLeft(7);
        if (key.isDown('D') || key.isDown('RIGHT')) visualPlayer.player.moveRight(7);

        if (key.isDown('R')) visualPlayer.player.weapon.startRecharge(visualPlayer.pouch);

        visualizeGrid(50);
        showEnemiesCount(visualEnemies);
        showNumberOfCartridges(visualPlayer.player.weapon);
        showTotalNumberOfCartridges(visualPlayer.pouch);

        pjs.vector.moveCollision(visualPlayer, visualEnemies, visualPlayer.player.speed);
        visualPlayer.player.stop();
        visualPlayer.draw();
        showPlayerHealthBar(visualPlayer);
        showWeaponArea(visualPlayer.player.weapon);

        OOP.forArr(visualBullets, function (visualBullet, index, visualBullets) {
            visualBullet.moveAngle(visualBullet.bullet.speed, visualBullet.bullet.angle);
            visualBullet.draw();
            let visualEnemy = visualBullet.isArrIntersect(visualEnemies);
            if (visualEnemy) {
                visualBullets.splice(index, 1);
                visualEnemy.enemy.getDamage(visualBullet.bullet.damagePower);
                if (visualEnemy.enemy.dead) {
                    visualEnemies.splice(visualEnemies.indexOf(visualEnemy), 1);
                }
            }
            if (pjs.vector.getDistance(visualBullet.startPosition, visualBullet.getPositionC()) >= visualBullet.bullet.maxRange) {
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