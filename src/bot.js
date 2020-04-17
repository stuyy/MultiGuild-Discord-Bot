require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents } = require('./utils/register');


client.on('guildCreate', async (guild) => {
  // try {
  //   await connection.query(
  //     `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
  //   );
  //   await connection.query(
  //     `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
  //   );
  // } catch(err) {
  //   console.log(err);
  // }
});

(async () => {
  await client.login(process.env.BOT_TOKEN);
  client.commands = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();