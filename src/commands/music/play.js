const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayCommand extends BaseCommand {
  constructor () {
    super('play', 'music', []);
  }

  run () {
    console.log(this.nane + ' was invoked');
  }
}