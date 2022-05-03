const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance!'),
        //.addUserOption((option) => option
         //   .setName('user')
         //   .setDescription('Whose balance do you want to see?')
         //   .setRequired(false)),
    async execute(interaction, client) {

        await interaction.deferReply();

        //const user = interaction.options.getUser('user')
        let userBalance = client.eco.fetchMoney(interaction.user.id);

        const balanceEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle(`${interaction.user.username}\'s Balance!`)
        .setDescription(`Balance - ${userBalance.amount}\nPosition - ${userBalance.position}`)


        return interaction.editReply({ embeds: [balanceEmbed] })
    },
};