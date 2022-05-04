const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: false,

    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance'),
    async execute(interaction) {

        await interaction.deferReply();

        const output = await eco.FetchBalance(interaction.user.id);

        const balanceEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${interaction.user.username}\'s Balance!`)
            .setDescription(`Balance - ${output.balance}`)

        interaction.editReply({ embeds: [balanceEmbed] });

    },
};