module.exports.operate = async ({client, msg, args, member, author, auth}, Schema = require("../Models/Restriction.js") ,Database = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.JailAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
    const reason = args.slice(1).join(" ");
    let UyarıSayısı;
    const Data = { Sebep: reason, Author: author.id, Date: Date.now(), sayi: 1};
    Database.findOne({SunucuID: msg.guild.id, userID: member.id}, async (err, res) => {
     if (!res) {
         UyarıSayısı = 1
        new Database({SunucuID: msg.guild.id, userID: member.id, Uyarılar: Data }).save();
      } else {
        let Sayi = Number(res.Uyarılar.length + 1);
         UyarıSayısı = Number(res.Uyarılar.length + 1);
        res.Uyarılar.push({Sebep: reason, Author: author.id, Date: Date.now(), sayi: Sayi++});
        await res.save();
      };
      if ((res) && (res.Uyarılar.length >= 3)) {
        let Sayii = 0;
        Schema.countDocuments().then(x => {
            Sayii = ( x + 1 );
            new Schema({CezaID: Sayii, userID: member.id, Type: "JAIL", Author: author.id, Reason: `+3 Uyarı Sayısı / Bot Tarafından Cezalıya Atıldı. Sebep: ${reason}`, DateNow: new Date(), Activity: true}).save();
            member.roles.set(member.roles.cache.get(auth.Booster) ? [auth.Booster, auth.CezaRoles.JailRoles] : [auth.CezaRoles.JailRoles]).catch(() => { });
    client.message(client.embed(`${member} - (\`${member.id}\`) adlı üye ${author} tarafından **${reason}** sebebi ile uyarıldı ve uyarı sayısı 3'ten fazla olduğu için otomatik olarak cezalıya yollandı.`, msg), msg.channel.id, 5000);
    client.message({embed: { 
    author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
    description: `${member} (\`${member.id}\`) üyesi ${author} tarafından ${UyarıSayısı}. uyarısını aldı ve otomatik olarak cezalıya atıldı. Sebep: ${reason}`, 
    color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.WarningLog)
        }); 
     } else {
    client.message(client.embed(`${member} - (\`${member.id}\`) adlı üye ${author} tarafından **${reason}** sebebi ile uyarıldı.(\`Uyarı Sayısı: ${UyarıSayısı}\`)`, msg), msg.channel.id, 7500);
    client.message({embed: { 
    author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
    description: `${member} (\`${member.id}\`) üyesi ${author} tarafından ${UyarıSayısı}. uyarısını aldı. Sebep: ${reason}`, 
    color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.WarningLog)
     }
    });
  };
  
  module.exports.help = {
    name: "uyar",
    alias: ["uyarıver","uyari","uyarı"]
  };

