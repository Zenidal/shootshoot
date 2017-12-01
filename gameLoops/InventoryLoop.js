function InventoryLoop(playerConfig, gameConfig) {
    this.update = function () {
        if(key.isPress('ESC')){
            gameObject.setLoop('game');
            camera.setPositionC(visualPlayer.visualObject.getPositionC());
        }
    }
}