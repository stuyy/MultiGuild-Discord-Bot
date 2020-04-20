const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveChannelCommand extends BaseCommand {
  constructor() {
    super('leave', 'music', []);
  }

  run (client, message, args) {
    const { id } = message.guild;
    const player = client.music.players.get(id);
    if (player) {
      client.music.players.destroy(id);
      console.log('Destroyed Player');
    }
  }
}