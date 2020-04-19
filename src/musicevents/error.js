const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class NodeErrorEvent extends BaseEvent {
  constructor () {
    super('nodeError');
  }

  async run (client, node, error) {
    console.log('An error has occured');
    console.log(error.message);
  }
}
