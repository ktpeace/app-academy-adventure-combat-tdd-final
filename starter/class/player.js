const colors = require('colors');
const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');
const {Weapon} = require('./weapon');
const {Equipment} = require('./equipment');
const {Mod} = require('./mod');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
    this.items = [];
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printObject(obj) {
    let objStr = '';
      for (const key in obj) {
        objStr += `+${obj[key]} ${key}`;
      }
      return objStr;
  }

  printInventory() {
    console.log(`weapon: ${this.currentWeapon.name}`);
    console.log(`equipment: ${this.currentEquipment.name}`);
    console.log(`gold: ${this.gold}`);
    console.log('');
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything else.`);
    } else {
      console.log(`inventory:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        let thisItem = this.items[i];
        if (thisItem instanceof Food) {
          console.log(`  ${thisItem.name} (${thisItem.healing} ` + '<3'.red + ')');
        } else if (thisItem instanceof Weapon) {
          console.log(`  ${thisItem.name} (${thisItem.power} dmg, ${thisItem.spells} spells)`);
        } else if (thisItem instanceof Equipment) {
          console.log(`  ${thisItem.name} (${thisItem.defense} def)`);
        } else if (thisItem instanceof Mod) {
          console.log(`  ${thisItem.name} (${this.printObject(thisItem.effects)})`)
        } else {
        console.log(`  ${thisItem.name}`);
        }
      }
    }
  }

    eatItem(itemName) {
        this.items.forEach((item, index) => {
            if (item.name === itemName) {
                if (item instanceof Food) {
                  this.health += item.healing;
                  console.log(`The ${item.name} restored ${item.healing} health.`)
                  this.items.splice(index, 1);
                }
            }
        })
    }

    getItemByName(name) {
        let thisItem;
        this.items.forEach(item => {
            if (item.name === name) thisItem = item;
        })
        return thisItem;
    }

  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name);
    if (!enemy) {
      console.log("You can't hit that.");
    } else {
      enemy.applyDamage(this.strength);
      console.log(`You hit the ${enemy.name} for ${this.strength} damage.`);
      enemy.setPlayer(this);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}
// let slime = new Enemy('slime', 'goopy fellow', 2, 4, 60);
// let pollock = new Player('Pollock');
// pollock.hit(slime);
// console.log(pollock);

module.exports = {
  Player,
};
