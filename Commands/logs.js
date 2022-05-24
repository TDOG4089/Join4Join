const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Check your personal logs!'),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        data = await get(interaction, interaction.user);

        const logs = new MessageEmbed()
        .setTitle('Logs!')
        .setDescription(`${data.logs}`)

        interaction.user.send({ embeds: [logs] });

        interaction.editReply({ content: 'Your logs have been sent in DMs!' });

    },
};