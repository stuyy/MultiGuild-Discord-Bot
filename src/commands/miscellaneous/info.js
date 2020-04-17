const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class InfoCommand extends BaseCommand {
  constructor () {
    super('info', 'moderation', []);
  }

  run () {
    console.log(this.name + ' was invoked');
  }
}