class VisualPlayer {
    constructor(gameObject, player, playerConfig, gameConfig) {
        this._gameObject = gameObject;
        this._visualObject = this._gameObject.newCircleObject({
            x: playerConfig.playerStartPosition.x, y: playerConfig.playerStartPosition.y,
            radius: playerConfig.playerSize / 2,
            strokeColor: 'red',
            strokeWidth: 3,
            fillColor: playerConfig.color,
        });
        this._player = player;
        this._pouch = gameConfig.getStartPouch();
    }

    get visualObject() {
        return this._visualObject;
    }

    get player() {
        return this._player;
    }

    get pouch() {
        return this._pouch;
    }

    set pouch(value) {
        this._pouch = value;
    }

    getNextPouch(pouches, pouch) {
        let currentPosition = pouches.indexOf(pouch);
        let nextPosition = (currentPosition + 1) >= pouches.length ? 0 : currentPosition + 1;
        this._pouch = pouches[nextPosition];
    };

    getPrevPouch(pouches, pouch) {
        let currentPosition = pouches.indexOf(pouch);
        let previousPosition = (currentPosition - 1) <= 0 ? pouches.length - 1 : currentPosition - 1;
        this._pouch = pouches[previousPosition];
    };
}