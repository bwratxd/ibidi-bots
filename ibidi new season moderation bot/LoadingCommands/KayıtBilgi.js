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
${auth.Reacts.star}  **Kayıt Verileri**
─────────────────
\`>\` Kayıt ettiği kullanıcı sayısı: \`(Toplam: ${res.Authorized.Man + res.Authorized.Woman || 0})\`
\`>\` Tag aldırdığı kullanıcı sayıları: \`${res.Authorized.Tags}\`
\`>\` Son kayıt ettiği kullanıcı: ${res.Authorized.Members.map(x => `<@${x}>`).slice(0, 1).join(",") || "Kullanıcı yok."}
\`>\` Son tag aldırdığı kullanıcı: ${res.Authorized.TagMembers.map(x => `<@${x}>`).slice(0, 1).join(",") || "Kullanıcı yok."}
`), msg.channel.id)
}
});
msg.react(client.react("duztik")).catch(() => { });
}

module.exports.help = {
    name: "kayıt-bilgi",
    alias: ["kayıtbilgi", "teyit"]
  };

/*

${auth.Reacts.star}  **Kayıt Bilgileri**
─────────────────
\`>\` Sunucuya son 20 kayıt ettiği kullanıcılar: ${res.Authorized.Members.map(x => `<@${x}>`).slice(0, 10).join(",") || "Kullanıcı yok."}
\`>\` Sunucuya son 20 tag aldırdığı kullanıcılar: ${res.Authorized.TagMembers.map(x => `<@${x}>`).slice(0, 20).join(",") || "Kullanıcı yok."}
*/
