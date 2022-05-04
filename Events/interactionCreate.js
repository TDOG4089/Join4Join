const config = require('../Database/config.json');

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (command['ownerOnly'] == true) {
            if (!interaction.user.id == `${config.ownerID[0]}`) {
                return interaction.reply({ content: 'Sorry, only the bot owners can run this command.', ephemeral: true });

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