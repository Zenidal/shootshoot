class ArmorPanel extends Panel{
    constructor(gameObject, OOP, startPosition) {
        super(gameObject, OOP, startPosition);
        this._armorsToSelection = [];
    }

    get armorsToSelection() {
        return this._armorsToSelection;
    }

    init(armors) {
        this._OOP.forArr(armors, function (armor, index) {
            let textSize = 30;
            let armorToSelection = this._gameObject.newTextObject({
                x: this._position.x, y: this._position.y + (textSize + 5) * index,
                text: armor.constructor.name,
                size: textSize,
                color: this._color,
                padding: 0,
                fillColor: this._fillColor,
                strokeColor: this._strokeColor,
                strokeWidth: 1,
                align: 'center'
            });
            armorToSelection.w = 200;
            armorToSelection.armor = armor;
            this._armorsToSelection.push(armorToSelection);
        }.bind(this));
    }

    drawPanel(visualPlayer) {
        OOP.forArr(this._armorsToSelection, function (armorToSelection) {
            armorToSelection.fillColor = visualPlayer.player.armor === armorToSelection.armor ? this._selecedColor : this._fillColor;
            armorToSelection.draw();
        }.bind(this));
    }
}