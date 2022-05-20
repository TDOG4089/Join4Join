const { get } = require('../Schemas/sqlite.js');
const db = require('quick.db');

module.exports = {
    name: 'guildMemberRemove',
    execute: async (member, client) => {

        if (await db.fetch(`coins_${member.user.id}`) === null) return

        let data = await get(member, member.user)

        let time = Date.now() - member.user.createdTimestamp

        if (time < 86400000) {
            return
        }

        if (data.code == 0) return;

        let link = await client.fetchInvite(`https://discord.gg/${data.code}`);

        if (link === undefined) return;

        if (data.joinedDate == 0) return;

        let timeout = 432000000;

        if (data.joinedDate === null || timeout - (Date.now() - data.joinedDate) < 1) {

            data.users.filter(x => x !== member.user.id)

            db.set(`users_${member.guild.id}`, data.users)

            db.set(`joinedDate_${member.guild.id}_${member.user.id}`, 0)

            return
        }

        db.subtract(`coins_${member.user.id}`, 4)

        data.logs.unshift(`[-4] - Left a server before 5 days have passed.`)

        db.set(`logs_${member.user.id}`, data.logs)

        data.users = data.users.filter(x => x !== member.user.id)

        db.set(`users_${member.guild.id}`, data.users)

        db.set(`joinedDate_${member.guild.id}_${member.user.id}`, 0)

    }
}