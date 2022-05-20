const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { get } = require('../Schemas/sqlite.js');
const db = require('quick.db');
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
            .setDescription('Quick description of your bot!')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        data = await get(interaction, interaction.user)

        const amount = interaction.options.getInteger('amount');
        const description = interaction.options.getString('description');

        if (!interaction.member.permissions.has('ADMINISTRATOR'))
            return interaction.editReply({ content: 'You don\'t have permissions to use this command!', ephemeral: true });

        const minimumAmount = new MessageEmbed()
            .setDescription(`You need to spend/input at least **5** coins to buy members!`)
            .setColor(config.color)
            .setTimestamp()

        if (amount < 5)
            return interaction.editReply({ embeds: [minimumAmount], ephemeral: true });
        if (data.coins < 5)
            return interaction.editReply({ embeds: [minimumAmount], ephemeral: true });
        if (amount > data.coins)
            return interaction.editReply({ embeds: [minimumAmount], ephemeral: true });

        let link = data.code;

        if (link == 0) {
            link = await interaction.channel.createInvite({ maxAge: 604800 });

            link = link.code;
        }

        await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
            link = await interaction.channel.createInvite({ maxAge: 0 });
            link = link.code;
            console.log(link);
        });


        await new Promise(resolve => setTimeout(resolve, 100));

        db.set(`code_${interaction.guild.id}`, link)

        data.logs.unshift(`[-${amount}] - Buy an advertisement for ${interaction.guild.name}.`)

        db.set(`logs_${interaction.user.id}`, data.logs)

        db.set(`description_${interaction.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)

        db.add(`orders_${interaction.guild.id}`, amount)

        db.subtract(`coins_${interaction.user.id}`, amount)

        const membersBought = new MessageEmbed()
            .setTitle(`Order successfully completed`)
            .setColor(config.color)
            .setDescription(`<@${interaction.user.id}>, you have bought**${amount}** members for your server!\nYou can now check the status of your order for **${client.guilds.cache.get(interaction.guild.id).name}** by using the **/info** command!`)

        interaction.editReply({ embeds: [membersBought], ephemeral: true });
    },
};