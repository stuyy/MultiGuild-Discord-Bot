const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShuffleQueueCommand extends BaseCommand {
  constructor () {
    super('shuffle', 'music', []);
  }

  async run (client, message, args) {
    const { channel } = message.member.voice;
    const player = client.music.players.get(message.guild.id);

    if (channel && player) {
      if (channel.id === player.voiceChannel.id) {
        player.queue.shuffle();
        message.channel.send('Shuffled the queue');
      }
    }
  }
}