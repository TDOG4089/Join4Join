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

        await interaction.deferReply({ ephemeral: true });

        let orders = await db.all(`orders_`, { sort: ".data" });

        let length = 5

        orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(interaction.user.id) === undefined);

        for (let i = 0; i < orders.length; i++) {

            let handler = true


            if (length > 5) {
                return;
            } else {

                let id = orders[i].ID.split("_")[1]

                let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name

                let code = await db.fetch(`code_${id}`)

                /*await client.fetchInvite("https://discord.gg/" + code).then(link => {
                    console.log(link.code)
                    if (link.code === null) handler = false
                }).catch(error => {
                    handler = false
                }) */

                await new Promise(resolve => setTimeout(resolve, 0))

                if (handler) {
                    let description = await db.fetch(`description_${id}`)

                    const invites = new MessageEmbed()
                        .setTitle('Invite link!')
                        .setDescription(`Join this server for a coin!\n\n**${guild}** - ${description}`)
                    interaction.editReply({ embeds: [invites], ephemeral: true })
                    length++
                }
            }
        };
    },
};