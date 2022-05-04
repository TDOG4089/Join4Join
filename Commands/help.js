const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    ownerOnly: true,

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Main command!'),
    async execute(interaction) {

        await interaction.deferReply();

        const adminlistEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle('Join4Join Help!')
            .addFields(
                { name: 'Help', value: 'Shows this command', inline: true },
                { name: 'Balance', value: 'Shows your balance', inline: true },
                { name: 'Leaderboard', value: 'Shows the leaderboard', inline: true },
                { name: 'Daily', value: 'Claim daily coins', inline: true },
                { name: 'Pay', value: 'Pay someone coins\n/pay <user> <amount>', inline: true },
                { name: 'Add-money', value: 'Add money to a user\n/add-money <user> <amount>\nOwner Only', inline: true },
                { name: 'Remove-money', value: 'Remove money from a user\n/remove-money <user> <amount>\nOwner Only', inline: true },
                { name: 'Set-money', value: 'Set a users coin amount\n/set-money <user> <amount>\nOwner Only', inline: true },
                { name: 'Admin-list', value: 'Shows the admin list', inline: true }
            )



        interaction.editReply({ embeds: [adminlistEmbed] });

    },
};