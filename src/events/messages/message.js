const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require('discord.js');
const {
  exists,
  insertGuildMember,
  updateGuildMemberExperience,
} = require('../../utils/database/utils');
const {
  randomExperience,
  checkExperience,
} = require('../../utils/database/random');

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
    else {
      const guildId = message.guild.id;
      const memberId = message.member.id;
      const result = (await exists(guildId, memberId))[0];
      if (result.length > 0) {
        const { experiencePoints, currentLevel } = result[0];
        const xp = randomExperience();
        const updatedXP = xp + experiencePoints;
        const newLevel = checkExperience(updatedXP, currentLevel);
        const update = await updateGuildMemberExperience(guildId, memberId, updatedXP, newLevel);
      } else {
        await insertGuildMember(guildId, memberId);
        console.log(`Updated XP for ${message.author.tag} in Guild (${guildId})`);
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

StateManager.on('guildAdded', (guildId, prefix) => {
  guildCommandPrefixes.set(guildId, prefix);
  console.log('Guild prefix Added');
});