const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: 32509 });
const { token } = require('./Database/config.json')

const { EconomyManager, db } = require("quick.eco")

client.commands = new Collection();
client.eco = new EconomyManager({
    adapter: 'sqlite'
});
client.db = db;
client.config = require('./Database/config.json');

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

client.login(token);