module.exports.operate = async ({client, msg, args, member ,author, auth}, {MessageEmbed} = require("discord.js")) => {
if (!author.voice.channel) return client.message(client.embed("Bu komutu kullanmak herhangi bir sesli kanala bağlanmalısın.", msg), msg.channel.id, 6500);
if (!member) return client.message(client.embed("Yanına gitmek istediğin bir kullanıcıyı seçmelisin.", msg), msg.channel.id, 6500);
if (!member.voice.channel || author.voice.channelID == member.voice.channelID ) return client.message(client.embed('Kullanıcı ile aynı kanaldasınız ya da kullanıcı bir sesli kanalda değil!', msg),msg.channel.id,6500);
let reason = args.slice(1).join(" ") || 'Sebep belirtilmedi.'
if ((author.roles.cache.some(r => auth.Perms.TransportAuth.includes(r.id))) || (author.permissions.has("ADMINISTRATOR"))) {
await author.voice.setChannel(member.voice.channelID).catch(() => { });
msg.react(client.react("duztik")).catch(() => { });
} else {
msg.channel.send({embed: { 
color: client.renk[Math.floor(Math.random() * client.renk.length)],
author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
description: `${member}, ${author} senin yanına **${reason}** sebebiyle gelmek istiyor onaylıyor musun?`,
footer: { text: "30 saniye içinde herhangi bir tepki vermezseniz komut iptal olur."}}}).then(async x => {
await x.react(client.react("duztik")).catch(() => { });
await x.react(client.react("iptal")).catch(() => { });
const onay = (reaction, user) => reaction.emoji.id === auth.Reacts.duztik && user.id === member.id;
const red = (reaction, user) => reaction.emoji.id === auth.Reacts.iptal && user.id === member.id;
const tik = x.createReactionCollector(onay, { time: 30000 });
const çarpı = x.createReactionCollector(red, { max: 1, time: 30000 });
tik.on("collect", r => {
author.voice.setChannel(member.voice.channelID).catch(() => { });
x.delete().catch(() => { });
msg.react(client.react("duztik")).catch(()=> { });
})
çarpı.on("collect", r => {
x.delete().catch(()=> { });
msg.react(client.react("iptal")).catch(()=> { });
})
setTimeout(() => {
x.delete().catch(() => { });
}, 30000)
});
};
};
  
module.exports.help = {
  name: "git",
  alias: ["go"]
};
