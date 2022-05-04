const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: true,

    data: new SlashCommandBuilder()
        .setName('set-money')
        .setDescription('Set someones coins to a specfic amount!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Which user are you setting money to?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much coins do you want to set it?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        if (amount > 99999) {
            return interaction.editReply({ content: 'You amount has to be lower than 6 digits! (Lower than 99999)' });
        }

        eco.SetBalance(user.id, amount)

        const setmoneyEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}\'s balance has been set!`)
            .setDescription(`${user.username}\'s balance has been set to ${amount}!`)

        interaction.editReply({ embeds: [setmoneyEmbed] });

    },
};