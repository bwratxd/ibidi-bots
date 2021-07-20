let Zaman = new Set();
module.exports.operate = async ({client, msg, args, member ,author, auth}, Database = require("../Models/Member.js"),{MessageEmbed} = require("discord.js")) => {
  if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
if (!Zaman[author.id])
Zaman[author.id] = { kullanim: 0};
if (Zaman[author.id].kullanim >= 1) return client.message(client.embed(`3 dakikada bir kere bu komudu kullanabilirsin.`, msg), msg.channel.id, 6500);
if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
let tagarray = [];
let VeriCheck = await Database.find({SunucuID: msg.guild.id})
  VeriCheck.forEach(x => {
    if(x.Authorized.TagMembers) x.Authorized.TagMembers.forEach(q => {
      tagarray.push(q)
    })
  })
if (tagarray.includes(member.id)) return client.message(client.embed(`Bu kullanıcı başka birisi tarafından tag aldırıldığı için sana ekleyemem.`, msg), msg.channel.id, 6500);
if (!member.user.username.includes(auth.Tags.RealTag)) return client.message(client.embed("Kullanıcının isminde tagımız bulunmuyor bu yüzden işlem iptal edildi.",msg),msg.channel.id,6500);
client.message(client.embed(`Kullanıcıya tag aldırma mesajı başarıyla gönderildi.` ,msg), msg.channel.id, 6500);
msg.react(client.react("duztik")).catch(() => { });
member.send({embed: { 
color: client.renk[Math.floor(Math.random() * client.renk.length)],
author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
description: `<@${member.id}>, <@${author.id}> (\`${author.id}\`) adlı yetkili sana tag aldırdığını söylüyor ve onaylamanı istiyor eğer onaylarsan yetkliliye puan eklenecek onaylıyor musun?`,
footer: { text: "3 dakika içinde herhangi bir tepki vermezseniz komut iptal olur."}}}).then(async x => {
await x.react(client.react("duztik")).catch(() => { });
await x.react(client.react("iptal")).catch(() => { });
const onay = (reaction, user) => reaction.emoji.id === auth.Reacts.duztik && user.id === member.id;
const red = (reaction, user) => reaction.emoji.id === auth.Reacts.iptal && user.id === member.id;
const tik = x.createReactionCollector(onay, { time: 1000 * 60 * 3  });
const çarpı = x.createReactionCollector(red, { max: 1, time: 1000 * 60 * 3 });
const Veri = await Database.findOne({SunucuID: msg.guild.id, userID: author.id});
tik.on("collect", r => {
x.delete().catch(() => { });
if (!Veri) { new Database({SunucuID: msg.guild.id, userID: author.id, Authorized: { Tags: 1, TagMembers: [member.id]}}).save();
} else {
  Veri.Authorized.Tags++
  Veri.Authorized.TagMembers.push(member.id)
  Veri.save()
}
client.message(client.embed(`${author} adlı yetkili ${member} (\`${member.id}\`) adlı kullanıcıya tagımızı (\`${auth.Tags.RealTag}\`) aldırdı.`, msg), auth.Logs.TagLog)
if (Zaman[author.id].kullanim >= 1) {
Zaman[author.id].kullanim = 0;
}
});
çarpı.on("collect", r => {
x.delete().catch(()=> { });
if (Zaman[author.id].kullanim >= 1) {
Zaman[author.id].kullanim = 0;
}
});
setTimeout(() => {
x.delete().catch(() => { });
if (Zaman[author.id].kullanim >= 1) {
Zaman[author.id].kullanim = 0;
}
}, 1000 * 60 * 3)
}).catch(() => { 
  client.message(client.embed(`Bir hata oluştu zaten gönderilmiş bir mesaj var ya da kullanıcının DM kutusu kapalı.`, msg), msg.channel.id, 6500);
});
Zaman[author.id].kullanim++;
};
  
module.exports.help = {
  name: "tagaldır",
  alias: ["tagaldir"]
};
