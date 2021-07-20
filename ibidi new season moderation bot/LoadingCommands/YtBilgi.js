module.exports.operate = async ({client, msg, args, author, auth}, Discord = require("discord.js"), Database = require("../Models/Member.js")) => {
if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || author;
  let embed2 = new Discord.MessageEmbed().setColor(client.renk[Math.floor(Math.random() * client.renk.length)]).setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true})).setThumbnail(msg.guild.iconURL({dynamic:true}));
    Database.findOne({SunucuID: msg.guild.id, userID: member.id}, async (err,res) => { 
     if (!res) {
      client.message(client.embed(`${client.react("iptal")} | Kullanıcının herhangi bir yetkili bilgisi bulunamamaktadır.`, msg), msg.channel.id, 6500);
     } else {
       res.Authorized.Members = res.Authorized.Members.reverse();
       res.Authorized.TagMembers = res.Authorized.TagMembers.reverse();
      client.message(embed2.setDescription(`
**• Kayıt Bilgileri**
\`>\` Kayıt: ${res.Authorized.Man + res.Authorized.Woman || 0} (\`${res.Authorized.Man} erkek, ${res.Authorized.Woman} kız.\`) 
\`>\` Tag aldırma sayısı: ${res.Authorized.Tags} 
\`>\` Son 10 tag aldırdığı kullanıcılar:\n${res.Authorized.TagMembers.map(x => `<@${x}>`).slice(0, 10).join(",") || "Kullanıcı yok."}
\`>\` Son 10 kayıt ettiği kullanıcılar:\n${res.Authorized.Members.map(x => `<@${x}>`).slice(0, 10).join(",") || "Kullanıcı yok."}\n

**• Ceza Bilgileri**
\`>\` Chat Mute: ${res.RestNumber.MuteNumber || 0}
\`>\` Voice Mute: ${res.RestNumber.VMuteNumber || 0}
\`>\` Jail: ${res.RestNumber.JailNumber || 0}
\`>\` Ban: ${res.RestNumber.BanNumber || 0}  `), msg.channel.id)

     }
  });
  msg.react(client.react("duztik")).catch(() => { });
};
  
  module.exports.help = {
    name: "ytbilgi",
    alias: ["ybilgi"]
  };
