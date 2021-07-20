const client = process.client;
const Database = require("../Models/Member.js");
const parsems = require("parse-ms");
const auth = require("../authorization.json");

class AFK {
  constructor(msg) {
    this.msg = msg;
  }
  AFKcikis(author) {
  Database.findOne({SunucuID: this.msg.guild.id, userID: this.msg.author.id}, async (err, res) => {
  if (res) {
    let afkveri = res.AFK || {};
    if (afkveri.mod) {
      res.AFK = {};
      res.save();
    if (author.manageable) author.setNickname(author.displayName.replace("[AFK]", "")).catch(() => { });
    let süre = parsems(Date.now() - afkveri.date); 
    if (süre.days !== 0) {
      client.message(`${this.msg.author} AFK modundan başarıyla çıkış yaptın, ${süre.days} gün ${süre.hours} saat önce AFK olmuştun.`, this.msg.channel.id, 6000);
      return;
    } else if (süre.hours !== 0) {
      client.message(`${this.msg.author} AFK modundan başarıyla çıkış yaptın, ${süre.hours} saat ${süre.minutes} dakika önce AFK olmuştun.`, this.msg.channel.id, 6000);
      return;
    } else if (süre.minutes !== 0) {
      client.message(`${this.msg.author} AFK modundan başarıyla çıkış yaptın, ${süre.minutes} dakika önce AFK olmuştun.`, this.msg.channel.id, 6000); 
      return;
    } else if (süre.seconds !== 0) {
      client.message(`${this.msg.author} AFK modundan başarıyla çıkış yaptın, biraz önce AFK olmuştun.`, this.msg.channel.id, 6000);
      return;
    };
  } else { };
} else { };
});
}
  
  isAFK(uye) {
    if ((uye.id !== this.msg.author.id) && (!client.AFKLAR.has(uye.id))) {
    Database.findOne({SunucuID: this.msg.guild.id, userID: uye.id}, async (err, res) => {
      if (res) {
        let afkveri = res.AFK || {};
        if (afkveri.mod) {
          let süre = parsems(Date.now() - afkveri.date);
          let reason = afkveri.reason;
          await client.AFKLAR.add(uye.id);
          setTimeout(() => client.AFKLAR.delete(uye.id), client.getDate(5, "saniye"));
      if (süre.days !== 0) {
        this.msg.channel.send(`${uye} ${süre.days} gün ${süre.hours} saat önce AFK moduna geçti. Sebep: ${reason}`, {  disableMentions: "everyone" }).then(x => x.delete({timeout: 6000})).catch(() => { });
        return;
      } else if (süre.hours !== 0) {
       this.msg.channel.send(`${uye} ${süre.hours} saat ${süre.minutes} dakika önce AFK moduna geçti. Sebep: ${reason}`, {  disableMentions: "everyone" }).then(x => x.delete({timeout: 6000})).catch(() => { });
        return;
      } else if (süre.minutes !== 0) {
        this.msg.channel.send(`${uye} ${süre.minutes} dakika önce AFK moduna geçti. Sebep: ${reason}`, {  disableMentions: "everyone" }).then(x => x.delete({timeout: 6000})).catch(() => { });
        return;
      } else if (süre.seconds !== 0) {
        this.msg.channel.send(`${uye} biraz önce AFK moduna geçti. Sebep: ${reason}`, {  disableMentions: "everyone" }).then(x => x.delete({timeout: 6000})).catch(() => { });
        return;
        };
      } else { };
    } else { };
  });
};
}  
}

function afkControl(message) {
  if (message.author.bot || message.channel.type === "dm" || auth.GuildData.Prefixes.some(x => message.content.startsWith(x)) || message.guild.id !== auth.GuildData.GuildID) return null;
  let uye = message.guild.member(message.mentions.users.first());
  let author = message.guild.member(message.author);
  new AFK(message).AFKcikis(author);
  if (uye) new AFK(message).isAFK(uye);
};

module.exports.event = {
  name: "message",
  eventOn: message => afkControl(message)
};