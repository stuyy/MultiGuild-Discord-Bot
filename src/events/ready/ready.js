const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class ReadyEvent extends BaseEvent {
  constructor () {
    super('ready');
  }
  
  async run (bot, message) {
    console.log(bot.user.tag + ' has logged in.');
    StateManager.on('YO', h => console.log(h));
    StateManager.emit('onGuildReady', 'hello');
  }
}