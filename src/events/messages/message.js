const BaseEvent = require('../../utils/structures/BaseEvent');

const guildCommandPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
  constructor () {
    super('message');
  }
  
  async run (bot, message) {
    console.log('message event emitted');
  }
}