const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js')
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Whose balance do you want to check?')),
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;

        data = await get(interaction, user);

        const embed = new MessageEmbed()
            .setTitle(`${user.username}\'s balance!`)
            .setDescription(`Balance - **${data.coins.toFixed(1)}** coins!`)
            .setColor(config.color)


        interaction.editReply({ embeds: [embed] });
    },
};