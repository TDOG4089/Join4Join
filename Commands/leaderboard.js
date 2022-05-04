const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../Database/config.json');
const eco = require('discord-economy')

module.exports = {
    ownerOnly: false,

    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Check the leaderboard!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        eco.Leaderboard({
            limit: 10,
        }).then(async users => {

            if (users[0]) var firstplace = await client.users.fetch(users[0].userid) //Searches for the user object in discord for first place
            if (users[1]) var secondplace = await client.users.fetch(users[1].userid) //Searches for the user object in discord for second place
            if (users[2]) var thirdplace = await client.users.fetch(users[2].userid)
            if (users[3]) var fourthplace = await client.users.fetch(users[3].userid)
            if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)
            if (users[5]) var sixthplace = await client.users.fetch(users[5].userid)
            if (users[6]) var seventhplace = await client.users.fetch(users[6].userid)
            if (users[7]) var eigthplace = await client.users.fetch(users[7].userid)
            if (users[8]) var ninthplace = await client.users.fetch(users[8].userid)
            if (users[9]) var tenthplace = await client.users.fetch(users[9].userid)

            const leaderboardEmbed = new MessageEmbed()
                .setColor(config.color)
                .setTitle(`Leaderboard!`)
                .setDescription(`1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
                2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
                3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}
                4 - ${fourthplace && fourthplace.tag || 'Nobody Yet'} : ${users[3] && users[3].balance || 'None'}
                5 - ${fifthplace && fifthplace.tag || 'Nobody Yet'} : ${users[4] && users[4].balance || 'None'}
                6 - ${sixthplace && sixthplace.tag || 'Nobody Yet'} : ${users[5] && users[5].balance || 'None'}
                7 - ${seventhplace && seventhplace.tag || 'Nobody Yet'} : ${users[6] && users[6].balance || 'None'}
                8 - ${eigthplace && eigthplace.tag || 'Nobody Yet'} : ${users[7] && users[7].balance || 'None'}
                9 - ${ninthplace && ninthplace.tag || 'Nobody Yet'} : ${users[8] && users[8].balance || 'None'}
                10 - ${tenthplace && tenthplace.tag || 'Nobody Yet'} : ${users[9] && users[9].balance || 'None'}`)

            interaction.editReply({ embeds: [leaderboardEmbed] });

        });

    },
};