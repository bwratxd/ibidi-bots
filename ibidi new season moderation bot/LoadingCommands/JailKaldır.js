module.exports.operate = async ({client, msg, args,auth, author}, fetch = require('node-fetch'), Database = require("../Models/Restriction.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.JailAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    let member = (msg.mentions.users.first()) || await (await fetch(`https://discord.com/api/users/${args[0]}`, {method:'GET', headers: {'Authorization': 'Bot ' + client.token}})).json();
    if ((!member) || (Object.keys(member).length == 1)) return client.message(client.noMember(msg), msg.channel.id, 6500);
    let member2 = msg.guild.members.cache.get(member.id);
    if ((member2) && (author.roles.highest.position <= member2.roles.highest.position)) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için cezalı rolünü alamazsın.`, msg), msg.channel.id, 5000);
    let reason = args.slice(1).join(" ") || "Sebep belirtilmedi.";
    let Data = await Database.find({Activity: true, userID: member.id, Type: "JAIL" });
    if ((Data.length <= 0) || ((member2) && (!member2.roles.cache.get(auth.CezaRoles.JailRoles)))) return client.message(client.embed(`${client.react("iptal")} | Belirttiğin kişi herhangi bir jail cezasına sahip değil.`, msg), msg.channel.id, 5500);
    if ((member2) && (member2.roles.cache.get(auth.CezaRoles.JailRoles))) member2.roles.set(member2.roles.cache.get(auth.Booster) ? [auth.Booster, auth.Perms.Unregister] : [auth.Perms.Unregister]).catch(() => { });
    Data.forEach(x => {
      x.Activity = false;
      x.save();
    });
    msg.channel.send(client.embed(`${member2 ?  `${member2} (\`${member.id}\`) üyesinin cezası kaldırıldı ve <@&${auth.CezaRoles.JailRoles}> rolü alındı.` : `${member.username}#${member.discriminator} üyesi sunucuda olmamasına rağmen cezası kaldırıldı.`}`, msg))
   client.message({embed: { 
      author: {  name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) },
      description: `${member2 ?  `${member2} (\`${member.id}\`) üyesinin cezası ${author} tarafından kaldırıldı ve <@&${auth.CezaRoles.JailRoles}> rolü alındı. Sebep: ${reason}` : `${member.username}#${member.discriminator} üyesi sunucuda olmamasına rağmen ${author} tarafından cezası kaldırıldı. Sebep: ${reason}`}`,
      color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.JailLog); 
  };
    
  module.exports.help = {
    name: "unjail",
    alias: ["cezalıal", "cezalı-kaldır"]
  };


 