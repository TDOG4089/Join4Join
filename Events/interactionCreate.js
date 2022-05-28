const config = require('../Database/config.json');
const db = require('quick.db');

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        /* const database = db.get('blacklisted');
        if (database.includes(interaction.user.id)) {
            interaction.reply({ content: 'You have been banned, you cannot use any commands!' });
        } */
        if (command['ownerOnly'] == true) {
            if (interaction.user.id != `${config.ownerID}`) {
                interaction.reply({ content: 'Sorry, only the bot owners can run this command.', ephemeral: true });
                return;
            }
        }

        try {
            command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
