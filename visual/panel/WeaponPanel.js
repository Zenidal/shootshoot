class WeaponPanel extends Panel{
    constructor(gameObject, OOP, startPosition) {
        super(gameObject, OOP, startPosition);
        this._weaponsToSelection = [];
    }

    get weaponsToSelection() {
        return this._weaponsToSelection;
    }

    initialize(weapons) {
        this._OOP.forArr(weapons, function (weapon, index) {
            let textSize = 30;
            let weaponToSelection = this._gameObject.newTextObject({
                x: this._position.x, y: this._position.y + (textSize + 5) * index,
                text: weapon.constructor.name,
                size: textSize,
                color: this._color,
                padding: 0,
                fillColor: this._fillColor,
                strokeColor: this._strokeColor,
                strokeWidth: 1,
                align: 'center'
            });
            weaponToSelection.w = 200;
            weaponToSelection.weapon = weapon;
            this._weaponsToSelection.push(weaponToSelection);
        }.bind(this));
    }

    drawPanel(visualPlayer) {
        OOP.forArr(this._weaponsToSelection, function (weaponToSelection) {
            weaponToSelection.fillColor = weaponToSelection.weapon === visualPlayer.player.weapon ? this._selecedColor : this._fillColor;
            weaponToSelection.draw();
        }.bind(this));
    }
}