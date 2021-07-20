module.exports.operate = async ({client, msg, args, member, auth, author}, ms = require("ms"), Discord = require("discord.js"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.VMuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    let channel = msg.guild.channels.cache.get(args[0]) || msg.member.voice.channel;
    if (!channel) return msg.channel.error(msg, "Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!");
    channel.members.forEach((x, index) => {
    setTimeout(() => {
    x.voice.setMute(false); 
    }) 
    })
    msg.channel.send(`\`${channel.name}\` kanalındaki tüm üyelerin susturulması kaldırıldı!`);
  }

module.exports.help = {
 name: "toplu-unsustur",
 alias: ["untoplumute"]
};