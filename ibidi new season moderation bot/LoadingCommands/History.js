module.exports.operate = async ({client, msg, args, member, author, auth}, Database = require("../Models/Member.js")) => { 
  if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  Database.findOne({SunucuID: msg.guild.id, userID: member.id}, async (err, res) => {
    if (!res) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının kayıt geçmişinde herhangi bir kayıt bulunmuyor!`,msg),msg.channel.id,6500);
    res = res.History.reverse();
    const History = res.map((e, i) => `\`${i + 1}) ${e.Name}\` (<@&${e.Roles}> - <@${e.Author}> - \`${e.Author}\`)`);
    client.message(client.embed(`${member} kullanıcısının tüm kayıt verileri aşağıda listelenmiştir listelere bakarak kayıt ediniz sorun görüyorsanız üst yetkililere ulaşın!\n\n${History.slice(0, 20).join("\n") || "Veri Yok."}`, msg), msg.channel.id);
  });
  msg.react(client.react("duztik")).catch(() => { });
};

module.exports.help = {
  name: "isimler",
  alias: ["history","geçmiş"]
};