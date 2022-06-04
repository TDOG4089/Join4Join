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

        let orders = await db.all(`orders_`, { sort: ".data" })

        let length = 5;

        orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(interaction.user.id) === undefined)

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Farm!')

        for (let i = 0; i < orders.length; i++) {

            let handler = true

            if (length > 5) { } else {

                let id = orders[i].ID.split("_")[1]

                let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name

                let code = await db.fetch(`code_${id}`)


                await client.fetchInvite("https://discord.gg/" + code)
                    .then(link => {
                        console.log(link.code)
                        if (link.code === null) handler = false
                    })
                    .catch(error => {
                        handler = false
                    })

                await new Promise(resolve => setTimeout(resolve, 1))

                if (handler) {
                    let description = await db.fetch(`description_${id}`)

                    embed.setDescription(`${guild} - ${description}`,)
                    length++
                }
            }
        }

        interaction.editReply({ embeds: [embed] });
    },
};