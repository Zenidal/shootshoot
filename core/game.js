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
let vector = pjs.vector;

key.initKeyControl();
mouse.initMouseControl();

let point = pjs.vector.point; // Constructor for Point
let width = gameObject.getWH().w; // width of scene viewport
let height = gameObject.getWH().h; // height of scene viewport

// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

gameObject.newLoopFromClassObject('game', new GameLoop(gameObject, new PlayerConfig(), new GameConfig()));

gameObject.startLoop('game');

function GameLoop(gameObject, playerConfig, gameConfig) {
    let visualPlayer = VisualEntitiesInitializer.createVisualPlayer(gameObject, playerConfig, gameConfig);

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

    let attackPlayer = function (visualEnemy, visualPlayer) {
        let speedByAxis = Math.random() * 10;
        let isPlayerLeft = visualPlayer.x < visualEnemy.x, isPlayerTop = visualPlayer.y < visualEnemy.y;
        isPlayerLeft ? visualEnemy.enemy.moveLeft(speedByAxis) : visualEnemy.enemy.moveRight(speedByAxis);
        isPlayerTop ? visualEnemy.enemy.moveTop(speedByAxis) : visualEnemy.enemy.moveBottom(speedByAxis);
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

    let changeWeapon = function (weapons, number) {
        if (weapons[number]) {
            return weapons[number];
        }
    };

    this.update = function () {
        gameObject.clear();
        if (mouse.isWheel('UP')) {
            visualPlayer.pouch = getNextPouch(gameConfig.pouches, visualPlayer.pouch);
        }
        if (mouse.isWheel('DOWN')) {
            visualPlayer.pouch = getPrevPouch(gameConfig.pouches, visualPlayer.pouch);
        }
        if (mouse.isDown('LEFT')) {
            let weapon = visualPlayer.player.weapon;
            if (weapon.shootWithAutoReloading(visualPlayer.pouch)) {
                try {
                    let bullet = weapon.createBulletFromCartridge(weapon.chargedCartridge, vector.getAngle2Points(visualPlayer.getPositionC(), mouse.getPosition()));
                    let visualBullet = VisualEntitiesInitializer.createVisualBullet(gameObject, visualPlayer.getPositionC(), bullet);
                    if (visualBullet) {
                        visualBullets.push(visualBullet);
                    }
                } catch (error) {
                    log(error);
                    log('Please change cartridges.');
                }
            }
        }

        if (key.isDown('1')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 0);
        if (key.isDown('2')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 1);
        if (key.isDown('3')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 2);

        if (key.isDown('W') || key.isDown('UP')) visualPlayer.player.moveTop(7);
        if (key.isDown('S') || key.isDown('DOWN')) visualPlayer.player.moveBottom(7);
        if (key.isDown('A') || key.isDown('LEFT')) visualPlayer.player.moveLeft(7);
        if (key.isDown('D') || key.isDown('RIGHT')) visualPlayer.player.moveRight(7);

        if (key.isDown('R')) visualPlayer.player.weapon.startRecharge(visualPlayer.pouch);

        camera.follow(visualPlayer, 30);
        EffectsVisualizer.visualizeGrid(brush, camera, 50);
        EffectsVisualizer.showInfo(brush, point(camera.getPosition().x, camera.getPosition().y), 'Enemies: ' + visualEnemies.length);
        EffectsVisualizer.showInfo(brush, point(camera.getPosition().x, camera.getPosition().y + 30), 'Number of cartridges: ' + visualPlayer.player.weapon.tempNumberOfCartridges);
        EffectsVisualizer.showInfo(brush, point(camera.getPosition().x, camera.getPosition().y + 60), 'Total number of cartridges: ' + visualPlayer.pouch.tempCount);

        vector.moveCollision(visualPlayer, visualEnemies, visualPlayer.player.speed);
        visualPlayer.player.weapon.decreaseTempDelayTime();
        visualPlayer.player.weapon.decreaseRechargeDelayTime();
        visualPlayer.player.stop();
        visualPlayer.draw();
        EffectsVisualizer.visualizeWeaponArea(
            brush,
            visualPlayer.player.weapon,
            point(visualPlayer.x + visualPlayer.radius - visualPlayer.player.weapon.range, visualPlayer.y + visualPlayer.radius - visualPlayer.player.weapon.range)
        );
        EffectsVisualizer.visualizeSelectingCartridge(
            brush,
            visualPlayer.player.weapon,
            point(visualPlayer.x + visualPlayer.radius - visualPlayer.player.weapon.range, visualPlayer.y + visualPlayer.radius - visualPlayer.player.weapon.range),
            visualPlayer.pouch.cartridge.color
        );
        EffectsVisualizer.visualizeHealthBar(point(visualPlayer.x, visualPlayer.y - 10), visualPlayer.radius + 20, 6, visualPlayer.player.health, 100);


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
            if (vector.getDistance(visualBullet.startPosition, visualBullet.getPositionC()) >= visualBullet.bullet.maxRange) {
                visualBullets.splice(index, 1);
            }
        });

        OOP.drawArr(visualEnemies, function (visualEnemy) {
            EffectsVisualizer.visualizeHealthBar(point(visualEnemy.x, visualEnemy.y - 10), visualEnemy.radius + 10, 6, visualEnemy.enemy.health, 100);
            attackPlayer(visualEnemy, visualPlayer);
            vector.moveCollision(visualEnemy, visualEnemies, visualEnemy.enemy.speed);

            if (visualEnemy.isStaticIntersect(visualPlayer)) {
                pjs.game.stop();
            }
        }.bind(this));
    };
}