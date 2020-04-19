const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
  constructor () {
    super('join', 'music', []);
  }

  async run (client, message, args) {
    const { channel } = message.member.voice;
    if (channel) {
      const player = client.music.players.spawn({
        guild: message.guild,
        voiceChannel: channel,
        textChannel: message.channel,
      });
      client.musicPlayers.set(message.guild.id, player);
      console.log(client.musicPlayers);
    } else {
      message.channel.send('Please join a voice channel.');
    }
  }
}