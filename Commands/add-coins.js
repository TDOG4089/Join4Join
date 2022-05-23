const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const db = require('quick.db');
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-coins')
        .setDescription('Add an user coins!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to add money to?')
            .setRequired(true))
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much money do you want to add?')
            .setRequired(true)),
    ownerOnly: true,
    async execute(interaction) {

        await interaction.deferReply();

        data = await get(interaction, interaction.user)

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        db.add(`coins_${user.id}`, amount)
        data.logs.unshift(`[+${amount}] - Coins given by an owner.`)
        db.set(`logs_${user.id}`, data.logs)

        const coinsAdded = new MessageEmbed()
            .setTitle('Added coins!')
            .setDescription(`${interaction.user.username} has added ${amount} coins to <@${user.id}>\'s balance!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [coinsAdded] });

        const userEmbed = new MessageEmbed()
            .setTitle('You have been added coins!')
            .setDescription(`${interaction.user.username} has added ${amount} coins to your balance!`)
            .setColor(config.color)

        user.send({ embeds: [userEmbed] }).catch(err => {
            interaction.editReply({ content: 'The user was **not** notified!' });
        })
    },
};
