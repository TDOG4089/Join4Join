const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the main command!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const helpEmbed = new MessageEmbed()
        .setTitle(client.user.username + 'help!')
        .setDescription(`${client.user.username} is a bot to help grow your server! It\'s simple to use and a basic decription of the commands are below!`)
        .addFields(
            { name: 'Balance', value: 'View your or someone elses balance!\n**/balance :user**', inline: false },
            { name: 'Check', value: 'Check if you can leave this server without losing coins!\n**/check** (Use this in the server you want to leave)', inline: false },
            { name: 'Buy-members', value: 'Buy members for your server\n**/buy-members :amount :description** (Use this in the server you want to buy members)', inline: false },
            { name: 'Farm', value: 'Join other servers to earn some coins!\n**/farm**', inline: false },
            { name: 'Pay', value: 'Pay another user coins!\n**/pay :user :amount**', inline: false },
            { name: 'Info', value: 'Check how many members joined since your order\n**/info** (Use this in the server you ordered members)', inline: false }
        )
        .setColor(config.color)

        interaction.editReply({ embeds: [helpEmbed] });
    },
};