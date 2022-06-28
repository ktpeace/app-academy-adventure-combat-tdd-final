const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom, items, strength, health, fidget, cooldown = 3000, attackTarget) {
    super(name, description, currentRoom, items, strength = 10, health = 50);
    this.fidget = fidget;
    this.cooldown = cooldown;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    let roomOptions = this.currentRoom.exits;
    let keys = Object.keys(roomOptions);

    let randomRoom = roomOptions[keys[ keys.length * Math.random() << 0]];
    this.currentRoom = randomRoom;

    console.log(`The ${this.name} rushed to the ${this.currentRoom.name}!`);
    this.cooldown += 3000;
    this.act();
  }

  takeSandwich() {
    let items = this.currentRoom.items;
    let keys = Object.keys(items);

    let randomItem = items[keys[ keys.length * Math.random() << 0]];
    this.takeItem(randomItem.name);

    console.log(`The ${this.name} took the ${randomItem.name}!`);
    this.cooldown += 1000;
    this.act();
  }

  rest() {
    let resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    if (this.attackTarget === null) return null;

    this.attackTarget.applyDamage(this.strength);
    console.log(`The ${this.name} hits you for ${this.strength} damage.`);
    this.cooldown += 2000;
    this.act();
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    } else {
        this.attackTarget = this.player;
        this.act();
    }
  }

  alert(message) {
    console.log(message);
    this.act();
  }

  scratchNose() {
    this.cooldown += 4000;
    this.alert(this.fidget);
  }

  act() {
    let randomNum = Math.floor(Math.random() * 5) ;

    if (this.health <= 0 || (this.player && this.player.currentRoom != this.currentRoom)) {
      // Do nothing
    } else if (this.cooldown > 0) {
      this.rest();
    }
    else if (this.attackTarget) {
      this.attack();
    }
    else {
      if (randomNum > 2) {
        this.scratchNose();
      } else if (this.currentRoom.items.length > 0) {
        this.takeSandwich();
      } else if (randomNum === 1) {
        this.attackTarget = this.player;
        this.act();
      } else {
        this.randomMove();
      }
    }

  }

}


module.exports = {
  Enemy,
};
