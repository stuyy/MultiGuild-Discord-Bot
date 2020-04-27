const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require('discord.js');
const guildCommandPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
  constructor () {
    super('message');
    this.connection = StateManager.connection;
  }
  
  async run (client, message) {
    if (message.author.bot) return;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    const usedPrefix = message.content.slice(0, prefix.length);
    
    if (prefix === usedPrefix) {
      const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
    
  }
}

StateManager.on('prefixFetched', (guildId, prefix) => {
  guildCommandPrefixes.set(guildId, prefix);
});

StateManager.on('prefixUpdate', (guildId, prefix) => {
  guildCommandPrefixes.set(guildId, prefix);
  console.log('Guild prefix updated');
});