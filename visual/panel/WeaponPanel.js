class WeaponPanel {
    constructor(gameObject, OOP) {
        this._gameObject = gameObject;
        this._OOP = OOP;
        this._weaponsToSelection = [];
    }

    initialize(weapons, x, y) {
        this._OOP.forArr(weapons, function (weapon) {
            let textSize = 30;
            let weaponToSelection = {
                text: weapon.constructor.name,
                size: textSize,
                color: 'rgba(255,255,255,1.0)',
                padding: 0,
                strokeColorText: 'red',
                strokeWidthText: 1
            };
            weaponToSelection.weapon = weapon;
            this._weaponsToSelection.push(weaponToSelection);
        }.bind(this));
    }

    drawPanel(brush, position) {
        OOP.forArr(this._weaponsToSelection, function (weaponToSelection, index) {
            brush.drawTextS({
                x: position.x, y: position.y + weaponToSelection.size * index,
                text: weaponToSelection.text,
                color: weaponToSelection.color,
                size: weaponToSelection.size,
                strokeColor: weaponToSelection.strokeColorText,
                strokeWidth: weaponToSelection.strokeWidthText
            });
        });
    }
}