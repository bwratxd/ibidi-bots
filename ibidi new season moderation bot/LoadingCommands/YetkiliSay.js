module.exports.operate = async ({client, msg, args, author, auth}, {MessageEmbed} = require("discord.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    const MemberSize = msg.guild.members.cache.filter(u => (u.roles.cache.some(x => auth.Perms.YTRoles.includes(x.id)))).size || 0;
    const TaglıSize = msg.guild.members.cache.filter(u => (u.roles.cache.some(x => auth.Perms.YTRoles.includes(x.id))) && (u.user.username.includes(auth.Tags.RealTag))).size || 0;
    const OnlineSize = msg.guild.members.cache.filter(u => (u.roles.cache.some(x => auth.Perms.YTRoles.includes(x.id))) && (u.presence.status !== "offline")).size;
    const VoiceSize = msg.guild.members.cache.filter(c => (c.roles.cache.some(x => auth.Perms.YTRoles.includes(x.id))) && (c.voice.channel)).size || 0;
      msg.channel.send(new MessageEmbed().setThumbnail(msg.guild.iconURL({dynamic: true})).setColor(client.renk[Math.floor(Math.random() * client.renk.length)]).setDescription(`
\`>\` Seste toplam **${VoiceSize}** yetkili var.
\`>\` Sunucumuzda toplam **${MemberSize}** yetkili var.
\`>\` Toplam **${TaglıSize}** yetkili tagımıza sahip.
\`>\` Sunucumuzda toplam **${OnlineSize}** çevrimiçi yetkili var.`))
  };
  
  module.exports.help = {
    name: "yetkilisay",
    alias: ["ysay"]
  };
