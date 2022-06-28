const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { Weapon } = require('./weapon');
const { Equipment } = require('./equipment');
const { Enemy } = require('./enemy');
const { Mod } = require('./mod');
const { Friend } = require('./friend');

class World {

  static rooms = {};
  static enemies = [];
  static friends = [];

  static setPlayer(player) {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].setPlayer(player);
      }
      if (World.friends[i]) {
        World.friends[i].setPlayer(player);
      }
    }
  }

  static startGame() {
    for (let i = 0 ; i < World.enemies.length ; i++) {
      if (World.enemies[i]) {
        World.enemies[i].rest();
      }
    }
  }

  static getEnemiesInRoom(room) {
    return World.enemies.filter(enemy => enemy.currentRoom === room);
  }

  static getFriendsInRoom(room) {
    return World.friends.filter(friend => friend.currentRoom === room);
  }

  static loadWorld(worldData) {

    const roomList = worldData.rooms;
    const itemList = worldData.items;
    const enemyList = worldData.enemies;
    const friendList = worldData.friends;

    // Instantiate new room objects
    // Get name, id and description from room data
    for (let i = 0 ; i < roomList.length ; i++) {

        let roomData = roomList[i];
        let newRoom = new Room(roomData.name, roomData.description);

        World.rooms[roomData.id] = newRoom;
    }

    // Connect rooms by ID
    // Note that all rooms must be created before they can be connected
    for (let i = 0 ; i < roomList.length ; i++) {

      let roomID = roomList[i].id;
      let roomConnections = roomList[i].exits;

      for (const direction in roomConnections) {
        let connectedRoomID = roomConnections[direction];
        let roomToConnect = World.rooms[connectedRoomID];
        World.rooms[roomID].connectRooms(direction, roomToConnect);
      }

    }

    // Instantiate items
    for (let i = 0 ; i < itemList.length ; i++) {

      let itemData = itemList[i];
      let newItem;

      if (itemData.isFood) {
        newItem = new Food(itemData.name, itemData.description, itemData.healing);
      } else if (itemData.isWeapon) {
        newItem = new Weapon(itemData.name, itemData.description, itemData.power);
      } else if (itemData.isMod) {
        newItem = new Mod(itemData.name, itemData.description, itemData.effects);
      } else {
        newItem = new Item(itemData.name, itemData.description);
      }

      let itemRoom = World.rooms[itemData.room];
      itemRoom.items.push(newItem);
   }

    // Instantiate enemies
    for (let i = 0 ; i < enemyList.length ; i++) {

      let enemyData = enemyList[i];
      let enemyRoom = World.rooms[enemyData.room];
      let newEnemy = new Enemy(enemyData.name, enemyData.description, enemyRoom, enemyData.items, enemyData.strength, enemyData.health, enemyData.fidget);
      World.enemies.push(newEnemy);
    }

    // Instantiate friends
    for (let i = 0 ; i < friendList.length ; i++) {

      let friendData = friendList[i];
      let friendRoom = World.rooms[friendData.room];
      let newFriend = new Friend(friendData.name, friendData.description, friendRoom, friendData.items, friendData.greeting);
      World.friends.push(newFriend);
    }

  }
}

module.exports = {
  World,
};
