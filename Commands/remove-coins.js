const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const db = require('quick.db');
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-coins')
        .setDescription('Remove an user coins!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to take money from?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much money do you want to take?')
            .setRequired(true)),
    ownerOnly: true,
    async execute(interaction) {

        await interaction.deferReply();

        data = await get(interaction, interaction.user)

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        db.subtract(`coins_${user.id}`, amount)
        data.logs.unshift(`[-${amount}] - Coins taken by an owner.`)
        db.set(`logs_${user.id}`, data.logs)

        const coinsAdded = new MessageEmbed()
            .setTitle('Subtracted coins!')
            .setDescription(`${interaction.user.username} has subtracted ${amount} coins from <@${user.id}>\'s balance!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [coinsAdded] });

        const userEmbed = new MessageEmbed()
            .setTitle('You have been subtracted coins!')
            .setDescription(`${interaction.user.username} has subtracted ${amount} coins from your balance!`)
            .setColor(config.color)

        user.send({ embeds: [userEmbed] }).catch(err => {
            interaction.editReply({ content: 'The user was **not** notified!', ephemeral: true });
        })
    },
};