require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const db = require('../database/db');

client.login(process.env.BOT_TOKEN);
client.on('ready', () => console.log(`${client.user.tag} logged in.`));