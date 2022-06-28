const { Weapon } = require("../class/weapon");
const { Equipment } = require("../class/equipment");
const { Item } = require("../class/item");

module.exports = {
  rooms: [
    {
      id: 1,
      name: "Crossroad",
      description: "You are standing at a crossroad. To the north, east, south and west you see empty space, waiting to be filled.",
      exits: {n: 2, e: 3, w: 4, s: 5}
    },
    {
      id: 2,
      name: "Northern Point",
      description: "You are standing at the north point of a crossroad. To the south, you see an empty intersection.",
      exits: {s: 1}
    },
    {
      id: 3,
      name: "Eastern Point",
      description: "You are standing at the east point of a crossroad. To the west, you see an empty intersection.",
      exits: {w: 1}
    },
    {
      id: 4,
      name: "Western Point",
      description: "You are standing at the west point of a crossroad. To the east, you see an empty intersection.",
      exits: {e: 1}
    },
    {
      id: 5,
      name: "Southern Point",
      description: "You are standing at the south point of a crossroad. To the north, you see an empty intersection.",
      exits: {n: 1, s: 6}
    },
    {
      id: 6,
      name: "Lonely Road",
      description: "A long, empty road extends beyond the horizon. Dust stirs in the wind.",
      exits: {n: 2, s: 7}
    },
    {
      id: 7,
      name: "Lonely Road",
      description: "This road seems to go on forever.",
      exits: {n: 6, s: 8}
    }, {
      id: 8,
      name: "Lonely Road",
      description: "You approach an old cornfield to the east of the road. The cobs were never picked. Now they're too withered to eat.",
      exits: {n: 7, s: 9, e: 10}
    }, {
      id: 9,
      name: "Lonely Road",
      description: "The long, empty road shows no other signs of life.",
      exits: {n: 8}
    }, {
      id: 10,
      name: "Abandoned Cornfield",
      description: "You move through the cornfield. The dry stalks rustle around you. You can't see anything else.",
      exits: {e: 11, w: 8}
    }, {
      id: 11,
      name: "Center of Abandoned Cornfield",
      description: "Nothing but whispering stalks and blue sky.",
      exits: {e: 12, w: 10}
    }, {
      id: 12,
      name: "Woods: West Edge",
      description: "A small clearing separates the cornfield and dark woods.",
      exits: {w: 11, e: 13}
    }, {
      id: 13,
      name: "Woods: Beech Canopy",
      description: "Tall beech trees filter the light to a dim glow.",
      exits: {w: 12}
    }
  ],
  items: [
    // Item
    {
      name: "rock",
      description: "Just a simple rock",
      room: 1
    },
    // Food
    {
      name: "sandwich",
      description: "A tasty looking sandwich",
      room: 2,
      healing: 5,
      isFood: true
    },
    // Weapon
    {
      name: "dagger",
      description: "A dull old dagger",
      room: 1,
      power: 3,
      isWeapon: true
    },
    // Mod
    {
      name: "mica",
      description: "A handful of glittery mica",
      room: 12,
      effects: {spells: 1},
      isMod: true
    }
    // Equipment
  ],
  enemies: [
    {
      name: "goblin",
      description: "a mean-looking goblin",
      items: [new Weapon("fork", "a bent old fork", 1)],
      strength: 10,
      health: 50,
      fidget: "The goblin scratches its nose.",
      room: 3
    },
    {
      name: "slime",
      description: "a goopy green ball with big eyes",
      items: [],
      strength: 7,
      health: 70,
      fidget: "The slime bobs gently.",
      room: 5
    },
    {
      name: "scarecrow",
      description: "a very angry scarecrow",
      items: [new Equipment("straw-hat", "a rustic straw hat to keep off the sun", 1)],
      strength: 12,
      health: 50,
      fidget: "The scarecrow glares at you with its painted black eyes.",
      room: 10
    }
  ],
  friends: [
    {
      name: "tinkerer",
      description: "a raggedy little man with bright eyes",
      items: [new Item("beech branch", "a suspiciously ordinary-looking branch")],
      greeting: "Need any weapons modified? I can do it for a price...",
      room: 12
    }
  ]
}
