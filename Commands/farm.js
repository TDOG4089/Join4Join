const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('farm')
        .setDescription('Join servers for coins!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        let orders = await db.all(`orders_`, { sort: ".data" });

                let code = await db.get(`code_${id}`)
                console.log('eee')
                if (handler) {
                    let description = await db.get(`description_${id}`)

                    const invites = new MessageEmbed()
                        .setTitle('Invite link!')
                        .setDescription(`Join this server for a coin!\n\ndiscord.gg/**${code}** - ${description}`)
                    interaction.editReply({ embeds: [invites] })
                    length++
                }
    },
};