module.exports.operate = async ({client, msg, args, author, auth}, Discord = require("discord.js"), Database = require("../Models/Member.js")) => {
    if (!auth.GuildData.BotOwners.includes(author.id)) return null;
    const bans = await msg.guild.fetchBans()

    for (const takashi of bans.array()) {
        await msg.guild.members.unban(takashi.user.id)
        msg.react('✅')
    }

}

  module.exports.help = {
    name: "unbanall",
    alias: []
  };