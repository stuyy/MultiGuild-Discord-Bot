require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents } = require('./utils/register');

(async () => {
  await client.login(process.env.BOT_TOKEN);
  client.commands = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();