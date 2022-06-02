const config = require('../Database/config.json');
const ownerID = [
    "901551680619966514",
    "718513966707376140"
]

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;
        
        if (command['ownerOnly'] == true) {
            if (!ownerID.includes(interaction.user.id)) {
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
