require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('./utils/StateManager');

let connection;
const { registerCommands, registerEvents } = require('./utils/register');
const guildCommandPrefixes = new Map();

client.on('guildCreate', async (guild) => {
  try {
    await connection.query(
      `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
    );
    await connection.query(
      `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
    );
  } catch(err) {
    console.log(err);
  }
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  const prefix = guildCommandPrefixes.get(message.guild.id);
  if (message.content.toLowerCase().startsWith(prefix + 'help')) {
    message.channel.send(`You triggered this command with the prefix: ${prefix}`);
  } else if (message.content.toLowerCase().startsWith(prefix + 'changeprefix')) {
    if (message.member.id === message.guild.ownerID) {
      const [ cmdName, newPrefix ] = message.content.split(" ");
      if (newPrefix) {
        try {
          await connection.query(
            `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
          );
          guildCommandPrefixes.set(message.guild.id, newPrefix);
          message.channel.send(`Updated guild prefix to ${newPrefix}`);
        } catch(err) {
          console.log(err);
          message.channel.send(`Failed to update guild prefix to ${newPrefix}`);
        }
      } else {
        message.channel.send('Incorrect amount of arguments');
      }
    } else {
      message.channel.send('You do not have permission to use that command');
    }
  }
});

(async () => {
  connection = await require('../database/db');
  await client.login(process.env.BOT_TOKEN);
  StateManager.emit('onGuildReady', connection);
  client.commands = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();
