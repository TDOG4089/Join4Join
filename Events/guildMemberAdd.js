const { get } = require('../Schemas/sqlite.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'guildMemberAdd',
    execute: async (member, client) => {

        if (member.user.bot) return;
        if (await db.get(`coins_${member.user.id}`) === null) return;
        let data = await get(member, member.user);
        let time = Date.now() - member.user.createdTimestamp;
        if (time < 86400000) {
            return;
        }
        if (data.code == 0) return;
        let link = await client.fetchInvite(`https://discord.gg/${data.code}`);
        if (link.inviter.id !== client.user.id) return;
        if (data.users.includes(member.user.id)) return;
        if (data.record.includes(member.user.id)) return;
        data.users.push(member.user.id)
        db.set(`users_${member.guild.id}`, data.users)
        db.add(`coins_${member.user.id}`, 1)
        db.set(`joinedDate_${member.guild.id}_${member.user.id}`, Date.now())
        data.record.push(member.user.id)
        db.set(`record_${member.guild.id}`, data.record)
        if (data.uses + 1 >= data.orders) {
            db.set(`orders_${member.guild.id}`, 0)
            db.set(`code_${member.guild.id}`, 0)
            db.set(`users_${member.guild.id}`, [])
            db.set(`uses_${member.guild.id}`, 0)
            db.set(`record_${member.guild.id}`, [])
        } else {
            db.add(`uses_${member.guild.id}`, 1)
        }
        const channel = member.client.channels.cache.get('979804039501987870');
        channel.send({ content: `||${member.id}|| - ||${member.guild.id}||\n${member.user.tag} just earned 1 by farming in ${member.guild.name}. Server stats - ${data.uses}/${data.orders}` });
    }
}
