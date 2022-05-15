const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const config = require('./Database/config.json')

const client = new Client({ intents: 32767 })

client.commands = new Collection();

// Commands
const commandFiles = fs.readdirSync('./Commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
const command = require(`./Commands/${file}`);
client.commands.set(command.data.name, command);
}

// Events
const eventFiles = fs.readdirSync('./Events')
  .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./Events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(config.token)