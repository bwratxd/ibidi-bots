module.exports.operate = async ({client, msg, args, author, auth}, Database = require("../Models/Member.js")) => {
    if (client.AFKLAR2.has(author.id)) return null;
    let reason = args.join(" ") || "Şu anda AFK'yım en kısa sürede döneceğim.";
    if ((client.reklamcilar.has(author.id)) && (reason.includes("discord.gg") || reason.includes("@everyone") || reason.includes("@here") || reason.includes(msg.mentions.roles.first()))) return msg.guild.members.ban(author.id, { reason: "reklam", days: 7});
    if (reason.includes(msg.mentions.users.first())) return null;
    if (reason.includes("discord.gg") || reason.includes("@everyone") || reason.includes("@here") || reason.includes(msg.mentions.roles.first())) {
      msg.delete({timeout: 10});
      msg.reply("`AFK` **moduna giriş yaparken link veya etiket (`@everyone, @Rol`) atamazsın.**", { disableMentions: "all" }).then(m => m.delete({ timeout: 3500 })).catch(() => { });
      client.reklamcilar.add(author.id);
      return;
    };
    Database.findOne({SunucuID: msg.guild.id, userID: author.id}, async (err, res) => {
      if (!res) {
        new Database({SunucuID: msg.guild.id, userID: author.id, AFK: { mod: true, reason: reason, date: Date.now() } }).save();
        if ((author.manageable) && (author.displayName.length < 28)) author.setNickname(`[AFK] ${author.displayName}`).catch(() => { });
        msg.reply(`Başarıyla AFK moduna geçtin ve mesajını şu şekilde ayarladım **${reason}**.`, { disableMentions: "all" }).then(m => m.delete({ timeout: 5500 })).catch(() => { });
      } else if ((res) && (!res.AFK) || (!res.AFK.mod)) {
        res.AFK = { mod: true, reason: reason, date: Date.now() };
        res.save();
        if ((author.manageable) && (author.displayName.length < 28)) author.setNickname(`[AFK] ${author.displayName}`).catch(() => { });
       msg.reply(`Başarıyla AFK moduna geçtin ve mesajını şu şekilde ayarladım **${reason}**.`, { disableMentions: "all" }).then(m => m.delete({ timeout: 5500 })).catch(() => { });
      }
    });
    if (client.AFKLAR2.has(author.id)) setTimeout(() => client.AFKLAR2.delete(author.id), client.getDate(7, "saniye"));
    if (client.reklamcilar.has(author.id)) setTimeout(() => client.reklamcilar.delete(author.id), client.getDate(10, "saniye"));
  };
  

  module.exports.help = {
    name: "afk",
    alias: ["afık"]
  };


