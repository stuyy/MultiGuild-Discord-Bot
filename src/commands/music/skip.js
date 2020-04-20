const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const PERCENTAGE = .5;

module.exports = class SkipCommand extends BaseCommand {
  constructor () {
    super('skip', 'music', []);
  }

  async run (client, message, args) {
    const player = client.music.players.get(message.guild.id);
    if (player) {
      const { channel } = message.member.voice;
      if (channel.id === player.voiceChannel.id) {
        const members = channel.members.filter(m => !m.user.bot);
        const totalVotesRequired = Math.ceil(members.size * PERCENTAGE);
        if (members.size === 1) {
          console.log('hello');
          player.stop(); // Skip song.
        } else {
          const voteEmbed = new MessageEmbed()
            .setDescription(`Voting to skip: ${player.queue[0].title}. Total Votes Required to skip: ${totalVotesRequired}`);

          const msg = await message.channel.send(voteEmbed);
          await msg.react('👍');
          await msg.react('👎');

          const filter = (reaction, user) => {
            const currentMember = message.guild.members.cache.get(user.id);
            if (currentMember) {
              if (currentMember.voice.channel.id === player.voiceChannel.id) {
                
              }
            } 
          }
          const reactions = await message.awaitReactions(filter, { max: totalVotesRequired });
        }
      }
    } else {
      console.log('Player does not exist.');
    }
  }
}