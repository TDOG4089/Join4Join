const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const get = async (interaction, user) => {
    let data = {}
    let object_user_based = {
        coins: 0,
        logs: [],
        banned: false,
        ticket: 0,
        freecoins: 0
    }
    let object_guild_based = {
        code: 0,
        orders: 0,
        uses: 0,
        record: [],
        serverLevel: 1,
        description: "",
        users: [],
    }

    let object_guild_user_based = {
        joinedDate: 0,
        activity: 0
    }

    Object.entries(object_user_based).map(async x => {
        let variable = x[0]
        let value = x[1]
        let item = await db.get(`${variable}_${user.id}`)

        if (item === null) data[variable] = value, db.set(`${variable}_${user.id}`, value)
        else data[variable] = item
    })

    Object.entries(object_guild_based).map(async x => {
        let variable = x[0]
        let value = x[1]
        let item = await db.get(`${variable}_${interaction.guild.id}`)
        if (item === null) db.set(`${variable}_${interaction.guild.id}`, value), data[variable] = value
        else data[variable] = item
    })
    Object.entries(object_guild_user_based).map(async x => {
        let variable = x[0]
        let value = x[1]
        let item = await db.get(`${variable}_${interaction.guild.id}_${user.id}`)
        if (item === null) db.set(`${variable}_${interaction.guild.id}_${user.id}`, value), data[variable] = value
        else data[variable] = item
    })

    await new Promise(resolve => setTimeout(resolve, 1))

    return data
}
module.exports = {
    get: get
} 