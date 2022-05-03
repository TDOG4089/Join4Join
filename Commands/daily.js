const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim some coins!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        let amount = Math.floor(Math.random() * 1) + 1;
        let addMoney = client.eco.daily(client.ecoAddUser, amount);

        const timeoutEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('Daily Coins!')
        .setDescription('You have already claimed your daily coins!\nTry the command after ${addMoney.time.hours} hours, ${addMoney.time.minutes} minutes and ${addMoney.time.seconds}!.')
        
        const claimEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('Daily Coins!')
        .setDescription(`You received **${addMoney.amount}** 💸 as your daily coins and now you have **${addMoney.after}**!`)       
        
        
        if (addMoney.onCooldown) {
            return interaction.editReply({ embeds: [timeoutEmbed] });
        } else {
            return interaction.editReply({ embeds: [claimEmbed] });
        }
    },
};