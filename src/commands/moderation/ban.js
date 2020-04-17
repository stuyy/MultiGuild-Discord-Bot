const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor () {
    super('ban', 'moderation', []);
  }

  run () {
    console.log(this.nane + ' was invoked');
  }
}