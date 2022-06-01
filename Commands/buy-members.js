const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require('../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy-members')
        .setDescription('Buy members with coins!')
        .addIntegerOption((option) => option
            .setName('amount')
            .setDescription('How much members do you want to buy?')
            .setRequired(true))
        .addStringOption((option) => option
            .setName('description')
            .setDescription('Quick description of your server!')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        data = await get(interaction, interaction.user)

        const amount = interaction.options.getInteger('amount');
        const description = interaction.options.getString('description');

        if (!interaction.member.permissions.has('ADMINISTRATOR'))
            return interaction.editReply({ content: 'You don\'t have permissions to use this command!' });

        const minimumAmount = new MessageEmbed()
            .setDescription(`You need to spend/input at least **5** coins to buy members!\n(Maybe you do not have 5 coins)`)
            .setColor(config.color)
            .setTimestamp()

        if (amount < 5)
            return interaction.editReply({ embeds: [minimumAmount] });
        if (data.coins < 5)
            return interaction.editReply({ embeds: [minimumAmount] });
        if (amount > data.coins)
            return interaction.editReply({ embeds: [minimumAmount] });

        let link = data.code;

        if (link == 0) {
            link = await interaction.channel.createInvite({ maxAge: 0 });
            link = link.code;
        }

        await interaction.client.fetchInvite('https://discord.gg/' + link).catch(err => {
            console.log(err);
            link = interaction.channel.createInvite({ maxAge: 0 });
            link = link.code;
            console.log(link);
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        db.set(`code_${interaction.guild.id}`, link)
        db.set(`description_${interaction.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)
        db.add(`orders_${interaction.guild.id}`, amount)
        db.sub(`coins_${interaction.user.id}`, amount)

        const membersBought = new MessageEmbed()
            .setTitle(`Order successfully completed`)
            .setColor(config.color)
            .setDescription(`<@${interaction.user.id}>, you have bought **${amount}** members for your server!\nYou can now check the status of your order for **${interaction.guild.name}** by using the **/info** command!`)

        interaction.editReply({ embeds: [membersBought] });

        client.channels.cache.get('978721902518493214').send({ content: `||${interaction.user.id}||\n${interaction.user.tag} just ordered **${amount}** members for the server **${interaction.guild.id}** (${interaction.guild.name})` });
    },
};