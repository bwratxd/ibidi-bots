module.exports.operate = async ({client, msg, args, member, auth, author}, ms = require("ms"), Database = require("../Models/Restriction.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.MuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
    if (!args[1]) {
        Database.find({userID: member.id, Activity: true, $or: [{Type: "MUTE"}, {Type: "VOICEMUTE"}]}, async(err, res) => {
          if (res.length <= 0) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının ceza listesinde aktif bir aktif ceza bulunmuyor!`, msg), msg.channel.id, 5500);
          res = res.reverse();
          let totalveri = res.map((x, index) => `\`${index + 1}.\` **[${x.Type}/CezaID: #${x.CezaID}]** var olan cezadan geriye \`${client.format((x.FinishDate - Date.now()))}\` kaldı.(Ceza Veren: <@${x.Author}>)`)
          msg.channel.send(client.embed(`**Kullanıcının aktif olan ses ve chat mute bilgileri aşağıda belirtilmiştir.**\n\n${totalveri.join(", \n")}`, msg))
        });
    } else if ((args[1]) && ["ses", "voice"].includes(args[1])) {
        Database.find({userID: member.id, Activity: true, Type: "VOICEMUTE"}, async (err,res) => {
          if (res.length <= 0) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının ceza listesinde herhangi bir aktif ceza bulunmuyor!`, msg), msg.channel.id, 5500);
          res = res.reverse();
          let sesveri = res.map((x, index) => `\`${index + 1}.\` **[${x.Type}/CezaID: #${x.CezaID}]** var olan cezadan geriye \`${client.format((x.FinishDate - Date.now()))}\` kaldı.(Ceza Veren: <@${x.Author}>)`)
          msg.channel.send(client.embed(`**Kullanıcının aktif olan sesli mute bilgileri aşağıda belirtilmiştir.**\n\n${sesveri.join(", \n")}`, msg))
        });
    } else if ((args[1]) && ["chat", "metin"].includes(args[1])) {
        Database.find({userID: member.id, Activity: true, Type: "MUTE"}, async (err,res) => {
          if (res.length <= 0) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının ceza listesinde herhangi bir aktif ceza bulunmuyor!`, msg), msg.channel.id, 5500);
          res = res.reverse();
          let sesveri = res.map((x, index) => `\`${index + 1}.\` **[${x.Type}/CezaID: #${x.CezaID}]** var olan cezadan geriye \`${client.format((x.FinishDate - Date.now()))}\` kaldı.(Ceza Veren: <@${x.Author}>)`)
          msg.channel.send(client.embed(`**Kullanıcının aktif olan chat mute bilgileri aşağıda belirtilmiştir.**\n\n${sesveri.join(", \n")}`, msg))
      });
    } else if ((args[1]) && !["chat", "metin", "ses", "voice"].includes(args[1])) {
          client.message(client.embed(`${client.react("iptal")} | Hatalı bir argüman girmeye çalışıyorsun. Ex: chat,voice/metin,ses`, msg), msg.channel.id, 7500);
    }
  };
    
  module.exports.help = {
    name: "mutebilgi",
    alias: ["muteinfo"]
  };
