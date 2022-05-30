const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const ms = require('ms');
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check if you can leave this server!'),
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        data = await get(interaction, interaction.user);

        let timeout = 259200000;

        let time = [];

        if (data.joinedDate !== null && timeout - (Date.now() - data.joinedDate) > 999) {
            Object.entries(ms(timeout - (Date.now() - data.joinedDate))).map((x, y) => {
                if (x[1] > 0 && y < 4) time.push(`**${x[1]} ${x[0]}**`)
            });


            const stayEmbed = new MessageEmbed()
                .setColor(config.color)
                .setDescription(`You will lose 4 coins if you leave now!`)
                .addField(`Remaining time:`, time.join(", "), false)
            interaction.editReply({ embeds: [stayEmbed], ephemeral: true })
        } else {
            const leaveEmbed = new MessageEmbed()
                .setColor(config.color)
                .setDescription(`You can leave this server without losing coins!!`)
            interaction.editReply({ embeds: [leaveEmbed], ephemeral: true });
        };
    },
};
