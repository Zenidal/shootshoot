class GameConfig {
    constructor() {
        this._weapons = [new Pistol(), new Gun(), new Automatic(), new SniperRifle()];
        this._pouches = [
            new Pouch(new PistolSimpleCartridge(), 300, 1000),
            new Pouch(new PistolExpansiveCartridge(), 300, 1000),
            new Pouch(new GunSimpleCartridge(), 150, 1000),
            new Pouch(new GunExpansiveCartridge(), 150, 1000),
            new Pouch(new GunFractionCartridge(), 150, 1000),
            new Pouch(new AutomaticSimpleCartridge(), 600, 1000),
            new Pouch(new AutomaticExpansiveCartridge(), 600, 1000),
            new Pouch(new SniperRifleSimpleCartridge(), 50, 1000),
            new Pouch(new SniperRifleArmorPiercingCartridge(), 50, 1000),
            new Pouch(new SniperRifleExpansiveCartridge(), 50, 1000)
        ];
    }

    get weapons() {
        return this._weapons;
    }

    get pouches() {
        return this._pouches;
    }

    getStartWeapon(){
        return this._weapons[0];
    }

    getStartPouch(){
        return this._pouches[0];
    }
}