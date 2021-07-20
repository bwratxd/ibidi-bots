module.exports.operate = async ({client, msg, args,auth, author}, fetch = require('node-fetch'), { GuildMember } = require("discord.js"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.BanAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    msg.guild.fetchBans(true).then(banned => {
    let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
    msg.channel.send(`${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.`, { code: "js", split: true })
    })
    }
    
  module.exports.help = {
    name: "banlist",
    alias: ["ban-list"]
  };