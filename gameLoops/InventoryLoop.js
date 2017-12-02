function InventoryLoop(playerConfig, gameConfig) {
    weaponPanel.init(gameConfig.weapons);
    pouchPanel.init(gameConfig.pouches);
    armorPanel.init(gameConfig.armors);

    this.update = function () {
        if (key.isPress('ESC')) {
            gameObject.setLoop('game');
            camera.setPositionC(visualPlayer.visualObject.getPositionC());
        }

        weaponPanel.drawPanel(visualPlayer);
        pouchPanel.drawPanel(visualPlayer);
        armorPanel.drawPanel(visualPlayer);

        if (mouse.isDown('LEFT')) {
            OOP.forArr(weaponPanel.weaponsToSelection, function (weaponToSelection) {
                if (mouse.isPeekObject('LEFT', weaponToSelection)) visualPlayer.player.weapon = weaponToSelection.weapon;
            });
            OOP.forArr(pouchPanel.pouchesToSelection, function (pouchToSelection) {
                if (mouse.isPeekObject('LEFT', pouchToSelection)) visualPlayer.pouch = pouchToSelection.pouch;
            });
            OOP.forArr(armorPanel.armorsToSelection, function (armorToSelection) {
                if (mouse.isPeekObject('LEFT', armorToSelection)) visualPlayer.player.armor = armorToSelection.armor;
            });
        }
    }
}