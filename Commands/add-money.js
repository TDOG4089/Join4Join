const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: true,

    data: new SlashCommandBuilder()
        .setName('add-money')
        .setDescription('Add coins to someone!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Which user are you adding money to?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much coins do you want to add?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        const output = await eco.FetchBalance(interaction.user.id);

        eco.AddToBalance(user.id, amount)

        const addmoneyEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}\'s balance has been added to!`)
            .setDescription(`${user.username}\'s balance has been added to by ${amount}!\nNow they have ${output.balance}!`)

        interaction.editReply({ embeds: [addmoneyEmbed] });

    },
};