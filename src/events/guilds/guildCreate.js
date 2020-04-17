const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor () {
    super('guildCreate');
  }
  
  async run (client, guild) {

  }
}
