var pjs = new PointJS(window.innerWidth, window.innerHeight, {
    backgroundColor: '#4b4843' // optional
});
// pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

var log = pjs.system.log; // log = console.log;
var gameObject = pjs.game;           // Game Manager
var point = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush = pjs.brush;          // Brush, used for simple drawing
var OOP = pjs.OOP;            // Objects manager
var math = pjs.math;           // More Math-methods

// var key   = pjs.keyControl.initKeyControl();
// var mouse = pjs.mouseControl.initMouseControl();
// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var width = gameObject.getWH().w; // width of scene viewport
var height = gameObject.getWH().h; // height of scene viewport

var key = pjs.keyControl;
key.initKeyControl();

var mouse = pjs.mouseControl;
mouse.initMouseControl();

pjs.system.setTitle('PointJS'); // Set Title for Tab or Window

gameObject.newLoopFromClassObject('game', new GameLoop(pjs));

gameObject.startLoop('game');