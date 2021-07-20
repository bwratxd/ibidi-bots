module.exports.operate = async ({client, msg, args,auth, author}, fetch = require('node-fetch'), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.JailAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    let member = (msg.mentions.users.first()) || await (await fetch(`https://discord.com/api/users/${args[0]}`, {method:'GET', headers: {'Authorization': 'Bot ' + client.token}})).json();
    if ((!member) || (Object.keys(member).length == 1)) return client.message(client.noMember(msg), msg.channel.id, 6500);
    let member2 = msg.guild.members.cache.get(member.id);
    if ((member2) && (author.roles.highest.position <= member2.roles.highest.position)) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için cezalı atamazsın.`, msg), msg.channel.id, 5000);
    let Sayi;
    let reason = args.slice(1).join(" ") || "Sebep belirtilmedi.";
    if ((member2) && (auth.CezaRoles.JailRoles !== "")) await member2.roles.set(member2.roles.cache.get(auth.Booster) ? [auth.Booster, auth.CezaRoles.JailRoles] : [auth.CezaRoles.JailRoles]).catch(() => { });
    Database.countDocuments().then(async x => {
    let VeriNumber = 0;
    VeriNumber = ( x + 1 );
    Schema.findOne({SunucuID: msg.guild.id, userID: member.id}, async (err, res) => {
      if (!res) {
        Sayi = 15;
        new Schema({SunucuID: msg.guild.id , userID: member.id, CezaPuan: 15}).save();
      } else {
        res.CezaPuan = Number(res.CezaPuan + 15);
        res.save();
        Sayi = res.CezaPuan;
      }
    client.message(`<@${member.id}>: aldığınız **#${VeriNumber}** ID'li ceza ile **${Sayi}** ceza puanına ulaştınız.`, auth.Logs.CezaPuanLog);
  });
  new Database({CezaID: VeriNumber, Type: "JAIL", userID: member.id, Author: author.id, Reason: reason, DateNow: Date.now(), Activity: true}).save()
  await client.NumberAdd({Database: Schema, Message: msg, Type: "JailAdd"});
  msg.channel.send(client.embed(`${member2 ?  `${member2} üyesine <@&${auth.CezaRoles.JailRoles}> rolü verildi. (\`#${VeriNumber}\`)` : `${member.username}#${member.discriminator} üyesi sunucuda olmamasına rağmen cezalıya atıldı. (\`#${VeriNumber}\`)`}`, msg))
   client.message({embed: { 
      author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
      description: `• Ceza ID: \`#${VeriNumber}\`
      • Jaile atılan üye: <@${member.id}> (\`${member.id}\`) 
      • Verilen rol: <@&${auth.CezaRoles.JailRoles}>
      • Jaile atan yetkili: ${author} (\`${author.id}\`)
      • Sebep: \`${reason}\``,
      color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.JailLog); 
    });
  };
    
  module.exports.help = {
    name: "jail",
    alias: ["cezalı", "cezali"]
  };


 