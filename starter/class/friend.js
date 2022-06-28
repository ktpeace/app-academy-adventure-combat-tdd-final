const {Character} = require('./character');
const {Weapon} = require('./weapon');
const {Mod} = require('./mod');

class Friend extends Character {
  constructor(name, description, currentRoom, items = [], greeting) {
    super(name, description, currentRoom, items);
    this.greeting = greeting;
  }

  setPlayer(player) {
    this.player = player;
  }

  act() {
      console.log(`The ${this.name} says, "${this.greeting}"`);
      console.log("");
      console.log("Type 'mod <weapon> <item>' to modify a weapon.");
  }

  askModify(weapon, mod) {
    if (weapon instanceof Weapon && mod instanceof Mod) {

      if (Math.max(...Object.values(mod.effects)) <= 3) {
        console.log(`"I can bind your ${mod.name} to your ${weapon.name} for 5 gold. Sound good?" (y/n)`);
        return 5;
      } else {
        console.log(`"I don't think you can afford that!"`);
      };

    } else {
      console.log(`"Those items can't combine!"`);
    };

    return 0;
  };

  modify(weapon, mod, cost) {
    let effects = mod.effects;

      for (const key in effects) {
          weapon[key] += effects[key];
      }
      weapon.description += `, modified by ${mod.name}`;

      this.player.dropItem(mod.name);
      this.player.gold -= cost;

      console.log(`The tinkerer cackles greedily. "Enjoy your new and improved ${weapon.name}!"`);
  }

}

// let tinkerer = new Friend('tinkerer', 'a guy', [], 'hi');
// let dagger = new Weapon('dagger', 'shiny', 3);
// let mica = new Mod('mica', 'shinier', {spells: 1});

// console.log(tinkerer.modify(dagger, mica));

module.exports = {
    Friend,
};
