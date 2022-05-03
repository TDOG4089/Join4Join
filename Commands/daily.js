const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: false,

    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily coins!'),
    async execute(interaction) {

        await interaction.deferReply();

        const output = await eco.Daily(interaction.user.id);

        const dailyEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${interaction.user.username}\'s Daily Coins!`)
            .setDescription(`You claimed 2 coins!`)

        const timeoutDailyEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${interaction.user.username}\'s Daily Coins!`)
            .setDescription(`You have already claimed your daily coins!\nTry again in ${output.timetowait}!`)


        if (output.updated) {

            const profile = await eco.AddToBalance(interaction.user.id, 2)
            return interaction.editReply({ embeds: [dailyEmbed] });

        } else {
            return interaction.editReply({ embeds: [timeoutDailyEmbed] });
        }

    },
};