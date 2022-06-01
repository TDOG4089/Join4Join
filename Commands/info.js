const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Check your info for the system!'),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        data = await get(interaction, interaction.user);

        if (data.code == 0) {

            const noInfo = new MessageEmbed()
                .setColor(config.color)
                .setTitle(`${interaction.guild.name}\'s info!`)
                .setDescription(`No purchase has been made in this server!`)

            interaction.editReply({ embeds: [noInfo], ephemeral: true });
        }

        let bar = []

        let progress = data.uses

        for (let i = 0; i < 10; i++) {
            progress = progress - (data.orders / 10)
            if (progress > 0) bar.push(`#`)
            else bar.push(`=`)
        }

        let info = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${interaction.guild.name}\'s info!`)
            .setDescription(`Members ordered: **${data.orders}**\nTotal members: **${data.uses}/${data.orders}**`)

        await client.fetchInvite('https://discord.gg/' + data.code).catch(e => interaction.followUp({ content: 'The invite link for this server has expired! Please place a new order or no one will be able to join!', ephemeral: true }));

        interaction.editReply({ embeds: [info], ephemeral: true });
    },
};