module.exports.operate = async ({client, msg, args, member, auth, author}, ms = require("ms"), Discord = require("discord.js"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.MuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  //if (author.roles.highest.position <= member.roles.highest.position) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için mute atamazsın.`, msg), msg.channel.id, 5000);
  let Time = args[1];
  let VeriNumber = 0;
  let Sayi;
  let reason = args.slice(2).join(" ") || "Sebep belirtilmedi.";
  if (!Time || !ms(Time)) return client.message(`\`\`\`Geçerli bir süre belirtmelisin! Ex: .mute @ibidi 5m Hakaret\`\`\``,msg.channel.id, 6500);
  if (auth.CezaRoles.MuteRoles !== "") await member.roles.add(auth.CezaRoles.MuteRoles).catch(() => { });
  Database.countDocuments().then(async x => {
  VeriNumber = ( x + 1 );
  Schema.findOne({SunucuID: msg.guild.id, userID: member.id}, async (err, res) => {
    if (!res) {
      Sayi = 4;
      new Schema({SunucuID: msg.guild.id , userID: member.id, CezaPuan: 4}).save();
    } else {
      res.CezaPuan = Number(res.CezaPuan + 4);
      res.save();
      Sayi = res.CezaPuan;
    }
  client.message(`${member}: aldığınız **#${VeriNumber}** ID'li ceza ile **${Sayi}** ceza puanına ulaştınız.`, auth.Logs.CezaPuanLog);
});
new Database({CezaID: VeriNumber, Type: "MUTE", userID: member.id, Author: author.id, Reason: reason, DateNow: Date.now(), Activity: true, Temporary: true, FinishDate: (Date.now() + ms(Time))}).save();
await client.NumberAdd({Database: Schema, Message: msg, Type: "MuteAdd"});
client.message(`${client.react("duztik")} ${member} ${client.format(ms(Time)).replace(", 0 saniye", "").trimEnd()} boyunca metin kanalları üzerinden geçici olarak susturuldu.\`(Ceza ID: ${VeriNumber})\``, msg.channel.id, 7500);
client.message({embed: { 
  author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
  description: `${member} (\`${member.user.tag} - ${member.id}\`) üyesi ${client.format(ms(Time)).replace(", 0 saniye", "").trimEnd()} süreliğine metin kanalları üzerinden susturuldu.\`(Ceza ID: ${VeriNumber})\`\n\n• Chat Mute Atılma: ${client.toDate(new Date(Date.now()))}\n• Chat Mute Bitiş: ${client.toDate(new Date(Date.now() + ms(Time)))}\n• Chat Mute Sebebi: ${reason}`, 
  color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.MuteLog)
});
};
  
module.exports.help = {
  name: "mute",
  alias: ["tempmute", "cmute"]
};
