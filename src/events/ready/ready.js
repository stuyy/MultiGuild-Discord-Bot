const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
let connection = null;

module.exports = class ReadyEvent extends BaseEvent {
  constructor () {
    super('ready');
    
  }
  
  async run (client, message) {
    console.log(client.user.tag + ' has logged in.');
    client.guilds.cache.forEach(guild => {
      connection.query(
        `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
      ).then(result => {
        guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
      }).catch(err => console.log(err));
    });
  }
}

