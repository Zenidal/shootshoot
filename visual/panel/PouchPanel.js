class PouchPanel extends Panel{
    constructor(gameObject, OOP, startPosition) {
        super(gameObject, OOP, startPosition);
        this._pouchesToSelection = [];
    }

    get pouchesToSelection() {
        return this._pouchesToSelection;
    }

    initialize(pouchs) {
        this._OOP.forArr(pouchs, function (pouch, index) {
            let textSize = 30;
            let pouchToSelection = this._gameObject.newTextObject({
                x: this._position.x, y: this._position.y + (textSize + 5) * index,
                text: pouch.cartridge.type,
                size: textSize,
                color: this._color,
                padding: 0,
                fillColor: this._fillColor,
                strokeColor: this._strokeColor,
                strokeWidth: 1,
                align: 'center'
            });
            pouchToSelection.w = 200;
            pouchToSelection.pouch = pouch;
            this._pouchesToSelection.push(pouchToSelection);
        }.bind(this));
    }

    drawPanel(visualPlayer) {
        OOP.forArr(this._pouchesToSelection, function (pouchToSelection) {
            pouchToSelection.fillColor = pouchToSelection.pouch === visualPlayer.pouch ? this._selecedColor : this._fillColor;
            pouchToSelection.draw();
        }.bind(this));
    }
}