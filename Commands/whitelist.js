const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Whitelist an user!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to whitelist?')
            .setRequired(true)),
    ownerOnly: true,
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');

        interaction.editReply({ content: `${user} has been whitelisted!` });
    },
};
