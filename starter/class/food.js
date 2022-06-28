const { Item } = require('./item');

class Food extends Item {

  constructor(name, description, healing) {
    super(name, description);
    this.healing = healing;
  }
}

module.exports = {
  Food,
};
