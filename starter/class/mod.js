const { Item } = require('./item');

class Mod extends Item {
    constructor(name, description, effects) {
        super(name, description);
        this.effects = effects;
    }
}

module.exports = {
    Mod,
};
