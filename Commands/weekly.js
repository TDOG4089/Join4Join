const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weekly')
        .setDescription('Claim some coins!'),
    async execute(interaction, client) {

        await interaction.deferReply();



        return interaction.editReply({ embeds: [embed] })
    },
};