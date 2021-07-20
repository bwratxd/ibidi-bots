module.exports.operate = async ({client, msg, args, author, member, auth}, Database = require("../Models/Restriction.js")) => {
  if ((!author.roles.cache.some(r => auth.Perms.VMuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  //  if (author.roles.highest.position <= member.roles.highest.position) return client.message(client.embed(`${client.react("iptal")} | Bu kişi senden yüksek veya aynı yetkiye sahip olduğu için sesli susturulmasını kaldıramazsın.`, msg), msg.channel.id, 5000);
    let reason = args.splice(1).join(" ") || "Sebep Girilmedi.";
    let Data = await Database.find({Activity: true, userID: member.id, Type: "VOICEMUTE" });
    if ((Data.length <= 0) & (!member.voice.serverMute)) return client.message(client.embed(`${client.react("iptal")} | Belirttiğin kişi herhangi bir ses mute cezasına sahip değil.`, msg), msg.channel.id, 5500);
    if (member.voice.channel) member.voice.setMute(false).catch(() => { });
    Data.forEach(x => {
      x.Activity = false;
      x.save();
    });
    client.message(client.embed(`${member} adlı kullanıcının sesli kanallar üzerinden susturulması **${reason}** sebebiyle kaldırıldı.`, msg), msg.channel.id,6500);
    client.message({embed: { 
      author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
      description: `${member}'ın sesli kanallar üzerinden olan susturulması ${author} tarafından **${reason}** sebebiyle kaldırıldı.`,
      color: client.renk[Math.floor(Math.random() * client.renk.length)]}}, auth.Logs.MuteLog); 
  };
  
   module.exports.help = {
     name: "vunmute",
     alias: ["sesmutekaldır","unmute"]
  };