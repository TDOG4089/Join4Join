const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const mongoose = require('mongoose');
const config = require('../Database/config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag} on Node ${process.version}`);
        console.log(`Inside ${client.guilds.cache.size} servers!`);
        console.log(`Handling ${client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)} users!`);
        client.user.setActivity('discord.gg/joinplus', { type: 'WATCHING' });

        const commands = [];
        const commandFiles = fs.readdirSync('./Commands')
            .filter(file =>
                file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../Commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(config.token);

        // Global Commands
        rest.put(Routes.applicationCommands(config.clientID),
            { body: commands })
            .then(() => console.log('Successfully registered global application commands.'))
            .catch(console.error);

        mongoose.connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to the database!');
        }).catch((err) => {
            console.log(err);
        });
    }
};
