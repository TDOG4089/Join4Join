const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: false,

    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Pay someone money!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Which user are you paying money?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much coins do you want to pay?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        const output = await eco.FetchBalance(interaction.user.id);

        const payEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}\'s has been payed!`)
            .setDescription(`${user.username} has been payed ${amount}!\nNow they have ${output.balance}\n\nThey have been payed from <@${interaction.user.id}>`)


        if (output.balance < amount) {
            interaction.editReply('You have fewer coins than the amount you want to transfer!');
        }

        await eco.Transfer(interaction.user.id, user.id, amount)

        interaction.editReply({ embeds: [payEmbed] });

    },
};