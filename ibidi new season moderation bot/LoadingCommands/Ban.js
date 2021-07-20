let BanSize = new Set();
module.exports.operate = async ({client, msg, args,auth, author}, fetch = require('node-fetch'), { GuildMember } = require("discord.js"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.BanAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!BanSize[author.id])
    BanSize[author.id] = { kullanim: 0};
    if (BanSize[author.id].kullanim >= 2) return client.message(client.embed(`Bir gün içinde maximum 2 tane ban atabilirsin.`, msg), msg.channel.id, 6500);
    let member = (msg.mentions.users.first()) || await (await fetch(`https://discord.com/api/users/${args[0]}`, {method:'GET', headers: {'Authorization': 'Bot ' + client.token}})).json();
    if ((!member) || (Object.keys(member).length == 1)) return client.message(client.noMember(msg), msg.channel.id, 6500);
    let member2 = msg.guild.members.cache.get(member.id);
    if ((member2) && (author.roles.highest.position <= member2.roles.highest.position)) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için sunucudan yasaklayamazsın.`, msg), msg.channel.id, 5000);
    let reason = args.slice(1).join(" ") || "Sebep belirtilmedi.";
    if (member2) member2.ban({reason: `${msg.member.user.tag} tarafından ${reason} sebebiyle yasaklandı`}).catch(() => { });
    Database.countDocuments().then(async x => {
        let VeriNumber = 0;
        VeriNumber = ( x + 1);
        new Database({CezaID: VeriNumber, Type: "BAN", userID: member.id, Author: author.id, Reason: reason, DateNow: Date.now(), Activity: true}).save()
        await client.NumberAdd({Database: Schema, Message: msg, Type: "BanAdd"});
        msg.channel.send(client.embed(`<@${member.id}> - (\`${member.id}\`) kullanıcısı **${reason}** sebebiyle sunucudan yasaklandı. ${member2 ? "" : `(**Kullanıcı sunucuda olmadığı için ceza veremedim fakat girdiği gibi yasaklanacak.**)`}`, msg));
    client.message({embed: { 
      author: {  name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) },
      description: `• Ceza ID: \`#${VeriNumber}\`
      • Yasaklanan Üye: <@${member.id}> (\`${member.username}#${member.discriminator} - ${member.id}\`)
      • Yasaklayan Yetkili: ${author} (\`${author.id}\`)
      • Yasaklanma Sebebi: (\`${reason}\`)`,
      color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.BanLog); 
    });
    BanSize[author.id].kullanim++;
    setTimeout(() => {
        if (BanSize[author.id].kullanim >= 1) {
            BanSize[author.id].kullanim = 0;
        }
    }, 86400000);
  };
    
  module.exports.help = {
    name: "ban",
    alias: ["bb", "kimsebas", "kimsebaş"]
  };
 

 