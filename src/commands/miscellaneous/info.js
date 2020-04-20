const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class InfoCommand extends BaseCommand {
  constructor () {
    super('info', 'moderation', []);
  }

  run (client, message, args) {
    console.log(this.name + ' was invoked');
    
  }
}