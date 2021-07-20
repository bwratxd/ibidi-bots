module.exports.operate = async ({client, msg, args, author, member, auth}, Database = require("../Models/Restriction.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.MuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
 //   if (author.roles.highest.position <= member.roles.highest.position) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için mute cezasını kaldıramazsın.`, msg), msg.channel.id, 5000);
    let reason = args.splice(1).join(" ") || "Sebep Girilmedi.";
    let Data = await Database.find({Activity: true, userID: member.id, Type: "MUTE" });
    if ((Data.length <= 0) & (!member.roles.cache.get(auth.CezaRoles.MuteRoles))) return client.message(client.embed(`${client.react("iptal")} | Belirttiğin kişi herhangi bir chat mute cezasına sahip değil!`, msg), msg.channel.id, 5500);
    if (member.roles.cache.get(auth.CezaRoles.MuteRoles)) member.roles.remove(auth.CezaRoles.MuteRoles).catch(() => { });
    Data.forEach(x => {
      x.Activity = false;
      x.save();
    });
    client.message(client.embed(`${member} adlı kullanıcının yazılı kanallar üzerinden susturulması **${reason}** sebebiyle kaldırıldı.`, msg), msg.channel.id,6500);
    client.message({embed: { 
      author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
      description: `${member}'ın yazılı kanallar üzerinden olan susturulması ${author} tarafından **${reason}** sebebiyle kaldırıldı.`,
      color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.MuteLog); 
  };
   
   module.exports.help = {
     name: "unmute",
     alias: ["mutekaldir","cmuteun","uncmute"]
  };