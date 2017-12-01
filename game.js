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

let gameConfig = new GameConfig();
let playerConfig = new PlayerConfig();

let weaponPanel = new WeaponPanel(gameObject, OOP, point(0, 0));
let pouchPanel = new PouchPanel(gameObject, OOP, point(200, 0));
let armorPanel = new ArmorPanel(gameObject, OOP, point(400, 0));

let visualEntitiesInitializer = new VisualEntitiesInitializer(gameObject);

let player = new Player(gameConfig.getStartWeapon(), playerConfig.playerStartHealth, playerConfig.startSpeed, playerConfig.grenadeDelay);
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

gameObject.newLoopFromClassObject('game', new GameLoop(playerConfig, gameConfig));
gameObject.newLoopFromClassObject('inventory', new InventoryLoop(playerConfig, gameConfig));

gameObject.startLoop('game');