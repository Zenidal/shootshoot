class Armor {
    constructor() {
        this._armorProtection = 0; //this number means count of damage will be absorbed
        this._maxNumberOfUses = 0;
        this._uses = 0;
    }

    get maxNumberOfUses() {
        return this._maxNumberOfUses;
    }

    get armorProtection() {
        return this._armorProtection * this.getCondition();
    }

    getRemainingUses(){
        return this._maxNumberOfUses - this._uses;
    }

    useOnce() {
        if (!this.isBroken()) {
            this._uses++;
        }
    }

    getCondition() {
        return this.getRemainingUses() / this._maxNumberOfUses;
    }

    getConditionPercentage() {
        return this.getCondition() * 100;
    }

    isBroken() {
        return this._uses >= this._maxNumberOfUses;
    }

    getUnprotectedDamage(startDamage) {
        let unprotectedDamage = startDamage - (this.isBroken() ? 0 : this.armorProtection);
        this.useOnce();
        return unprotectedDamage >= 0 ? unprotectedDamage : 0;
    }
}