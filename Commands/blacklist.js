const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js')
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist an user!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to blacklisted?')
            .setRequired(true)),
    ownerOnly: true,
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');

        data = await get(interaction, user);

        db.add('blacklisted', user.id);


        interaction.editReply({ content: `${user} has been blacklisted!` });
    },
};