const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const blacklist = require('../Schemas/blacklist.js');
const config = require('../Database/config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist an user!')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Who do you want to blacklisted?')
            .setRequired(true)),
    ownerOnly: true,
    async execute(interaction) {

        await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser('user');

        blacklist.findOne({ id: user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                return interaction.editReply({ content: `${user} has already been blacklisted!`, ephemeral: true });
            } else {
                data = new blacklist({ id: user.id })
            }
            data.save().catch(err => {
                interaction.editReply({ content: `An error occured!`, ephemeral: true });
            })
            interaction.editReply({ content: `${user} has succesfully been blacklisted!`, ephemeral: true });
        })
    },
};
