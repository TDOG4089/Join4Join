const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');

module.exports = {
    ownerOnly: true,

    data: new SlashCommandBuilder()
        .setName('admin-list')
        .setDescription('Check whose an admin!'),
    async execute(interaction) {

        await interaction.deferReply();

        const adminlistEmbed = new MessageEmbed()
            .setColor(config.color)
            .setTitle('Admin List!')
            .setDescription(`1) <@${config.ownerID[0]}>\n2) <@${config.ownerID[1]}>\n3) <@${config.ownerID[2]}>\n4) <@${config.ownerID[3]}>\n5) <@${config.ownerID[4]}>`)



        interaction.editReply({ embeds: [adminlistEmbed] });

    },
};