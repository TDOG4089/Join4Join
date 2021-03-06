const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Pay someone coins!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to pay?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much do you want to pay?')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        data = await get(interaction, interaction.user)

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        /*-------------------------------------------------------------------------*/
        const notEnough = new MessageEmbed()
            .setDescription(`You don't have **${amount}** coins!`)
            .setColor(config.color)
            .setTimestamp()
        /*-------------------------------------------------------------------------*/
        const minimumAmount = new MessageEmbed()
            .setDescription(`The minimum payment is **5** coins!`)
            .setColor(config.color)
            .setTimestamp()
        /*-------------------------------------------------------------------------*/
        const payYourself = new MessageEmbed()
            .setDescription(`You cannot pay youself!`)
            .setColor(config)
            .setTimestamp()
        /*-------------------------------------------------------------------------*/

        if (data.coins < Number(amount))
            return interaction.editReply({ embeds: [notEnough], ephemeral: true });

        if (Number(amount) < 5)
            return interaction.editReply({ embeds: [minimumAmount], ephemeral: true });

        if (user.id === interaction.user.id)
            return interaction.editReply({ embeds: [payYourself], ephemeral: true });


        const payed = new MessageEmbed()
            .setTitle('Pay coins!')
            .setDescription(`You have sent **${amount}** coins to <@${user.id}>!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [payed], ephemeral: true });

        const userEmbed = new MessageEmbed()
            .setTitle('You have been payed!')
            .setDescription(`${interaction.user.username} has sent you ${amount} coins!`)
            .setColor(config.color)

        // user.send({ embeds: [userEmbed] });

        db.sub(`coins_${interaction.user.id}`, Number(amount));
        data = await get(interaction, user);
        db.add(`coins_${user.id}`, Number(amount));

        client.channels.cache.get('991109520103325767').send({ content: `||${interaction.user.id}||\n${interaction.user.tag} just payed **${amount}** coins to ${user.tag}` });
    },
};
