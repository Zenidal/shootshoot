class PlayerConfig{
    constructor(){
        this._playerStartHealth = 100;
        this._playerSize = 40;
        this._playerStartPosition = {x: 300, y: 300};
        this._color = 'black';
        this._startSpeed = 4;
    }

    get playerSize() {
        return this._playerSize;
    }

    get playerStartPosition() {
        return this._playerStartPosition;
    }

    get playerStartHealth() {
        return this._playerStartHealth;
    }

    get color() {
        return this._color;
    }

    get startSpeed() {
        return this._startSpeed;
    }
}