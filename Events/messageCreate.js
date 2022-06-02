const config = require('../Database/config.json');

module.exports = {
    name: 'messageCreate',
    execute: async(message, client) => {


        if (message.content === '+farm') {
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

                let code = await db.get(`code_${id}`)

                await client.fetchInvite("https://discord.gg/" + code).then(link => {
                    console.log(link.code)
                    if (link.code === null) handler = false
                }).catch(error => {
                    handler = false
                })

                await new Promise(resolve => setTimeout(resolve, 0))

                if (handler) {
                    let description = await db.get(`description_${id}`)

                    const invites = new MessageEmbed()
                        .setTitle('Invite link!')
                        .setDescription(`Join this server for a coin!\n\n**${guild}** - ${description}`)
                    message.reply({ embeds: [invites] })
                    length++
                }
            }
        };
    }
    },
};