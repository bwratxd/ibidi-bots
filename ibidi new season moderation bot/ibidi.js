const { Client } = require("discord.js");
const fs = require("fs");
const auth = require("./authorization.json");
const mongoose = require("mongoose");
const moment = require("moment");
const klaw = require("klaw");
const path = require("path");
const logs = require("discord-logs");
const pretty = require("pretty-ms");
const ms = require("ms");require("moment-duration-format");
moment.locale("tr");
const client = new Client({ disableMentions: "everyone", ignoreDirect: true, ignoreRoles: true, fetchAllMembers: true, _tokenType: "Bot" });
client.commands = new Map();
client.aliases = new Map();
client.locked = new Set();
client.snipe = new Set();
client.AFKLAR = new Set();
client.AFKLAR2 = new Set();
client.reklamcilar = new Set();
process.client = client;
require("./Loading/loadFunction.js")(client, auth, moment);
require("./Loading/loadEvents.js")(fs, client);
require("./Loading/loadCommands.js")(fs, client);
require("./Loading/loadMongoose.js")(mongoose, auth);
require("./Loading/loadToken.js")(client, auth);

client.getDate = (date, type) => {
let sure;
date = Number(date);
if (type === "saniye") { sure = (date * 1000) }
else if (type === "dakika") { sure = (60 * 1000) * date }
else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
return sure;
};

client.message = (content, Channel, timeout) => {
const channel = client.channels.cache.get(Channel);
if (!timeout) {
if (channel) channel.send(content).catch(() => { });
} else {
if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });
}
};

client.tarih = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
  
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
  
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
  
    string = string.trim();
    return `\`${string} önce\``;
  };

client.renk = new Array("#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");

client.toDate = date => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};

 client.voicembed = message => {
     return {
         description: message,
         color: client.renk[Math.floor(Math.random() * client.renk.length)],
         footer: { text: `${client.toDate(Date.now())}` }
     };
 };

  let iltifat = 0;
  let iltifatlar = [
    "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
    "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
    "Mavi gözlerin, gökyüzü oldu dünyamın.",
    "Seni gören kelebekler, narinliğin karşısında mest olur.",
    "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
    "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
    "Huzur kokuyor geçtiğin her yer.",
    "En güzel manzaramsın benim, seyretmeye doyamadığım.",
    "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
    "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
    "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
    "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
    "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
    "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
    "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
    "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
    "Etkili gülüş kavramını ben senden öğrendim.",
    "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
    "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
    "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan h er toprak benim de vatanımdır.",
    "Gözlerinle baharı getirdin garip gönlüme.",
    "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
    "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
    "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
    "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
    "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
    "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
    "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
    "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
    "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
    "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
    "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
    "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
    "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
    "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
    "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
    "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
    "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim."];

client.on("message", async msg => {
    let botVoiceChannel = client.channels.cache.get("bot-channel-id");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  if (msg.channel.id == auth.GuildData.GChat && !msg.author.bot && auth.GuildData.Prefixes.some(x => !msg.content.startsWith(x))) {
    iltifat++;
    if (iltifat >= 100) {
      iltifat = 0;
      let ibidiltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];
      msg.reply(ibidiltifat);
    }
  }
});

const RoleDatabase = require("./Models/Rol.js")
  client.on("guildMemberUpdate", async(oldMember, newMember) =>{
    let aldiverdi;
    if(oldMember.roles.cache.size < newMember.roles.cache.size){ aldiverdi = "<a:yildiz_ok:858639173883396096>" } else { aldiverdi = "<a:yildiz_no:858639174159433738>"}
    if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
    let rolveren = await oldMember.guild.fetchAuditLogs({ type: 'GUILD_MEMBER_UPDATE' }).then(audit => audit.entries.first());
    let role = oldMember.roles.cache.find(s => !newMember.roles.cache.has(s.id)) || newMember.roles.cache.find(s => !oldMember.roles.cache.has(s.id))
    let ibidi = await RoleDatabase.findOne({ guildID: newMember.guild.id, kullanıcıID: newMember.id }) 
    if(!ibidi){
      let newRoleData = new RoleDatabase({
        guildID: newMember.guild.id,
        kullanıcıID: newMember.id,
        rolveridb: { staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi }
      }).save(); } else {
        ibidi.rolveridb.push({ staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi })
        ibidi.save()
      }
  }
    })

