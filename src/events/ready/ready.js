const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
  constructor () {
    super('ready');
    this.connection = StateManager.connection;
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.guilds.cache.forEach(guild => {
      this.connection.query(
        `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
        const guildId = guild.id;
        const prefix = result[0][0].cmdPrefix;
        guildCommandPrefixes.set(guildId, prefix);
        StateManager.emit('prefixFetched', guildId, prefix);
      }).catch(err => console.log(err));
    });
  }
}
