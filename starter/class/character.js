const { Weapon } = require('./weapon');
const { Equipment } = require('./equipment');

class Character {

  constructor(name, description, currentRoom, items = [], strength = 10, health = 100, defense = 0) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = items;
    this.strength = strength;
    this.health = health;
    this.defense = defense;
    this.currentWeapon = new Weapon('fists', 'just yer bare hands', 0);
    this.currentEquipment = new Equipment('plainclothes', 'plain old cotton clothes', 0);
    this.gold = 5;
  }

  applyDamage(amount) {
    this.health -= (amount - this.defense);
    if (this.health <= 0) this.die();
  }

 takeItem(itemName) {
    const roomItems = this.currentRoom.items;
    roomItems.forEach((item, index) => {
        if (item.name === itemName) {
            let taken = roomItems.splice(index, 1);
            this.items.push(taken[0]);
            if (item instanceof Weapon) {
              if (item.power > this.currentWeapon.power) {
                this.currentWeapon = item;
                this.strength = 10 + item.power;
              }
            } else if (item instanceof Equipment) {
                if (item.defense > this.currentEquipment.defense) {
                this.currentEquipment = item;
                this.defense = 0 + item.defense;
              }
            }
        }
    });


  }

  dropItem(itemName) {
    this.items.forEach((item, index) => {
        if (item.name === itemName) {
            let dropped = this.items.splice(index, 1);
            this.currentRoom.items.push(dropped[0]);
        }
    })
  }

  dropAllItems() {
    for (let i = 0; this.items.length > 0; i++) {
      console.log(`The ${this.name} dropped its ${this.items[0].name}.`);
      let dropped = this.items.splice(0, 1);
      this.currentRoom.items.push(dropped[0]);
    }
  }

  die() {
    this.dropAllItems();
    console.log(`The ${this.name} died!`);
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
