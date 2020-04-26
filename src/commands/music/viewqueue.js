const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ViewQueueCommand extends BaseCommand {
  constructor () {
    super('viewqueue', 'music', []);
  }

  async run (client, message, args) {
    
  }
}