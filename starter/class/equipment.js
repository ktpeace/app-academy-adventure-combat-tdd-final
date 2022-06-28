const { Item } = require('./item');

class Equipment extends Item {
    constructor(name, description, defense) {
        super(name, description);
        this.defense = defense;
    }
}

module.exports = {
    Equipment,
};
