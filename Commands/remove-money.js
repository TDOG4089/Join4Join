const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: true,

    data: new SlashCommandBuilder()
        .setName('remove-money')
        .setDescription('Remove coins to someone!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Which user are you removing money from?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much coins do you want to remove?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        const output = await eco.FetchBalance(interaction.user.id);

        eco.SubtractToBalance(user.id, amount)

        const removemoneyEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}\'s balance has been taken from!`)
            .setDescription(`${user.username}\'s balance has been lowered by ${amount}!\nNow they have ${output.balance}!`)

        interaction.editReply({ embeds: [removemoneyEmbed] });

    },
};