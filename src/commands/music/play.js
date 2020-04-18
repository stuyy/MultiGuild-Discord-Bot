const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayCommand extends BaseCommand {
  constructor () {
    super('play', 'music', []);
  }

  run (client, message, args) {
    console.log(this.name + ' was invoked');
  }
}