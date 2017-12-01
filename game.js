let pjs = new PointJS(window.innerWidth, window.innerHeight, {
    backgroundColor: '#4b4843' // optional
});
pjs.system.setTitle('PointJS'); // Set Title for Tab or Window
pjs.system.initFPSCheck();

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
    let weaponPanel = new WeaponPanel(gameObject, OOP);
    weaponPanel.initialize(gameConfig.weapons, 0, 300);

    let visualEntitiesInitializer = new VisualEntitiesInitializer(gameObject);

    let player = new Player(gameConfig.getStartWeapon(), playerConfig.playerStartHealth, playerConfig.startSpeed);
    let visualPlayer = new VisualPlayer(gameObject, player, playerConfig, gameConfig);

    let visualEnemies = [];
    let visualBullets = [];
    let visualGrenades = [];
    OOP.fillArr(visualEnemies, 100, function () {
        let visualEnemy = gameObject.newCircleObject({
            x: 500 + Math.random() * 2000, y: 500 + Math.random() * 2000,
            radius: 10,
            fillColor: 'green'
        });
        visualEnemy.enemy = new Enemy(100, Math.random() * 5);
        return visualEnemy;
    });

    let changeWeapon = function (weapons, number) {
        if (weapons[number]) {
            return weapons[number];
        }
    };

    let shoot = function (shootPosition) {
        let weapon = visualPlayer.player.weapon;
        if (weapon.shootWithAutoReloading(visualPlayer.pouch)) {
            try {
                let bullets = weapon.createBulletsFromCartridge(weapon.chargedCartridge, vector.getAngle2Points(visualPlayer.visualObject.getPositionC(), shootPosition));
                OOP.forArr(bullets, function (bullet) {
                    let visualBullet = visualEntitiesInitializer.createVisualBullet(bullet, visualPlayer.visualObject.getPositionC());
                    if (visualBullet) {
                        visualBullets.push(visualBullet);
                    }
                });
            } catch (error) {
                log(error);
                log('Please change cartridges.');
            }
        }
    };

    this.update = function () {
        gameObject.clear();
        if (mouse.isWheel('UP')) {
            visualPlayer.getNextPouch(gameConfig.pouches, visualPlayer.pouch);
        }
        if (mouse.isWheel('DOWN')) {
            visualPlayer.getPrevPouch(gameConfig.pouches, visualPlayer.pouch);
        }
        if (mouse.isDown('LEFT')) {
            shoot(mouse.getPosition());
        }
        if (mouse.isDown('RIGHT') && visualPlayer.player.canThrowGrenade()) {
            visualPlayer.player.initializeGrenadeDelayTimer();
            let grenade = new Grenade({
                speed: 5,
                angle: vector.getAngle2Points(visualPlayer.visualObject.getPositionC(), mouse.getPosition()),
                rangeOfThrow: vector.getDistance(visualPlayer.visualObject.getPositionC(), mouse.getPosition()),
                maxRange: 300,
                damagePower: 90,
                explosionDelay: 50,
                explosionArea: 200,
                explosionTime: 50,
                size: 10,
                color: 'black',
                explodedColor: 'rgba(255,255,0,0.3)'
            });
            let visualGrenade = visualEntitiesInitializer.createVisualGrenade(grenade, visualPlayer.visualObject.getPositionC(), mouse.getPosition());

            grenade.addExplosionCallback(function (grenade) {
                OOP.forArr(visualGrenades, function (visualGrenade) {
                    if (visualGrenade.grenade === grenade) {
                        let oldRadius = visualGrenade.radius;
                        visualGrenade.setRadius(visualGrenade.grenade.size);
                        visualGrenade.x = visualGrenade.x + oldRadius - visualGrenade.grenade.size;
                        visualGrenade.y = visualGrenade.y + oldRadius - visualGrenade.grenade.size;
                        visualGrenade.fillColor = visualGrenade.grenade.color;

                        OOP.forArr(visualEnemies, function (visualEnemy, index, visualEnemies) {
                            if (visualGrenade.isStaticIntersect(visualEnemy)) {
                                visualEnemy.enemy.getDamage(visualGrenade.grenade.damagePower);
                                if (visualEnemy.enemy.dead) {
                                    visualEnemies.splice(index, 1);
                                }
                            }
                        });
                    }
                })
            });

            visualGrenades.push(visualGrenade);
        }

        if (key.isPress('1')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 0);
        if (key.isPress('2')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 1);
        if (key.isPress('3')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 2);
        if (key.isPress('4')) visualPlayer.player.weapon = changeWeapon(gameConfig.weapons, 3);

        if (key.isDown('W') || key.isDown('UP')) visualPlayer.player.moveTop();
        if (key.isDown('S') || key.isDown('DOWN')) visualPlayer.player.moveBottom();
        if (key.isDown('A') || key.isDown('LEFT')) visualPlayer.player.moveLeft();
        if (key.isDown('D') || key.isDown('RIGHT')) visualPlayer.player.moveRight();

        if (key.isDown('R')) visualPlayer.player.weapon.startRecharge(visualPlayer.pouch);

        camera.follow(visualPlayer.visualObject, 30);
        EffectsVisualizer.visualizeGrid(brush, camera, 50);
        EffectsVisualizer.showInfo(brush, point(0, 0), 'Enemies: ' + visualEnemies.length);
        EffectsVisualizer.showInfo(brush, point(0, 30), 'Number of cartridges: ' + visualPlayer.player.weapon.tempNumberOfCartridges);
        EffectsVisualizer.showInfo(brush, point(0, 60), 'Total number of cartridges: ' + visualPlayer.pouch.tempCount);
        EffectsVisualizer.showInfo(brush, point(0, 90), 'FPS: ' + pjs.system.getFPS());

        vector.moveCollision(visualPlayer.visualObject, visualEnemies, visualPlayer.player.tempSpeed);
        visualPlayer.player.weapon.decreaseTempDelayTime();
        visualPlayer.player.weapon.decreaseRechargeDelayTime();
        visualPlayer.player.decreaseGrenadeDelay();
        visualPlayer.player.stop();
        visualPlayer.visualObject.draw();

        let visualizePoint = point(
            visualPlayer.visualObject.x + visualPlayer.visualObject.radius - visualPlayer.player.weapon.range,
            visualPlayer.visualObject.y + visualPlayer.visualObject.radius - visualPlayer.player.weapon.range
        );

        weaponPanel.drawPanel(brush, point(0, 120));
        EffectsVisualizer.visualizeWeaponArea(brush, visualPlayer.player.weapon, visualizePoint);
        EffectsVisualizer.visualizeSelectingCartridge(brush, visualPlayer.player.weapon, visualizePoint, visualPlayer.pouch.cartridge.color, 2);
        EffectsVisualizer.visualizeCartridges(visualPlayer.player.weapon, visualizePoint, 2);
        EffectsVisualizer.visualizeHealthBar(point(visualPlayer.visualObject.x, visualPlayer.visualObject.y - 10), 2 * visualPlayer.visualObject.radius, 6, visualPlayer.player.health, 100);

        OOP.forArr(visualBullets, function (visualBullet, index, visualBullets) {
            //TODO recalculate distance (now distance can be more than max range)
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

        OOP.forArr(visualGrenades, function (visualGrenade, index, visualGrenades) {
            //TODO recalculate distance (now distance can be more than max range)
            visualGrenade.grenade.decreaseExplosionTimer();
            visualGrenade.grenade.decreaseTempExplosionTime();
            visualGrenade.moveAngle(visualGrenade.grenade.speed, visualGrenade.grenade.angle);

            if (visualGrenade.grenade.destructed) {
                visualGrenades.splice(index, 1);
            }
            if (vector.getDistance(visualGrenade.startPosition, visualGrenade.getPositionC()) >= visualGrenade.grenade.maxRange ||
                vector.getDistance(visualGrenade.startPosition, visualGrenade.getPositionC()) >= visualGrenade.grenade.rangeOfThrow
            ) {
                visualGrenade.grenade.startDetonateTimer();
            }
            visualGrenade.draw();
        });

        OOP.drawArr(visualEnemies, function (visualEnemy) {
            EffectsVisualizer.visualizeHealthBar(point(visualEnemy.x, visualEnemy.y - 10), visualEnemy.radius + 10, 6, visualEnemy.enemy.health, 100);
            visualEnemy.moveAngle(visualEnemy.enemy.speed, vector.getAngle2Points(visualEnemy.getPosition(), visualPlayer.visualObject.getPosition()));

            if (visualEnemy.isStaticIntersect(visualPlayer.visualObject)) {
                visualPlayer.player.getDamage(1);
                if (visualPlayer.player.dead) pjs.game.stop();
            }
        }.bind(this));
    };
}