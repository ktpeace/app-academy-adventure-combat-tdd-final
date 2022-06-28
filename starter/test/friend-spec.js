const { expect } = require('chai');

const { Player } = require('../class/player');
const { Room } = require('../class/room');
const { Weapon } = require('../class/weapon');
const { Mod } = require('../class/mod');
const { Friend } = require('../class/friend');


describe('Friend', () => {
    let tinkerer;
    let player;
    let room;
    let weapon;
    let mod;


    beforeEach(() => {
        room =  new Room("Test Room", "A test room");
        player = new Player('Kat', room);
        tinkerer = new Friend('tinkerer', 'a guy', room, [], 'hi');
        tinkerer.setPlayer(player);

        weapon = new Weapon('dagger', 'shiny', 1);
        mod = new Mod('mica', 'shinier', {spells: 1});
        player.items.push(weapon);
        player.items.push(mod);
    });

    it ('should have a name, description, room, and greeting', () => {
        expect(tinkerer.name).to.equal("tinkerer");
        expect(tinkerer.description).to.equal("a guy");
        expect(tinkerer.currentRoom).to.equal(room);
        expect(tinkerer.greeting).to.equal('hi');
    });

    it ('should recognize the current player', () => {

        expect(tinkerer.player).to.exist;
    });

    it ('should offer a mod & return cost when askModify() is called with a weapon and low-stat item', () => {
        expect(tinkerer.askModify(weapon, mod)).to.equal(5);
    });

    it ('should decline a mod & return 0 when askModify() is called without appropriate items', () => {
        mod = new Mod('mica', 'shinier', {spells: 5});
        expect(tinkerer.askModify(weapon, mod)).to.equal(0);
    });
});


describe('Friend', () => {

    beforeEach(() => {
        room =  new Room("Test Room", "A test room");
        player = new Player('Kat', room);
        tinkerer = new Friend('tinkerer', 'a guy', room, [], 'hi');
        tinkerer.setPlayer(player);

        weapon = new Weapon('dagger', 'shiny', 1);
        mod = new Mod('mica', 'shinier', {spells: 1});
        player.items.push(weapon);
        player.items.push(mod);

        tinkerer.modify(weapon, mod, 5);
    });

    it ('should alter the weapon stats when modify() is called', () => {
        expect(weapon.spells).to.equal(1);
    });

    it ('should alter the weapon description when modify() is called', () => {
        expect(weapon.description).to.equal('shiny, modified by mica');
    });

    it ('should subtract the player gold when modify() is called', () => {
        expect(player.gold).to.equal(0);
    });

    it ('should make the player drop the mod item when modify() is called', () => {
        expect(player.items.length).to.equal(1);
    });

});
