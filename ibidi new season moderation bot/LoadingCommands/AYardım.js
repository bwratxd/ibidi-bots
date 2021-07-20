module.exports.operate = async ({client, msg, args, member ,author, auth}, {MessageEmbed} = require("discord.js")) => {
  if ((!author.roles.cache.some(r => auth.Perms.TalentAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
msg.channel.send({embed: { 
color: client.renk[Math.floor(Math.random() * client.renk.length)],
author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
description: `**Rol Yardım Menüsü**
Öncelikle bir rol vermek istiyorsanız <@&${auth.Perms.TalentAuth[0]}> rolüne sahip olmanız gerekiyor. Bu komut sayesinde aşağıdaki rolleri kullanıcılara verebilirsiniz.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

<@&${auth.Talent.Streamer}>: \`.streamer [@Kullanıcı]\`
<@&${auth.Talent.StreamerCezalı}>: \`.streamercezalı [@Kullanıcı]\`
<@&${auth.Talent.Vokal}>: \`.vokal [@Kullanıcı]\`
<@&${auth.Talent.Ressam}>: \`.ressam [@Kullanıcı]\`
<@&${auth.Talent.Şair}>: \`.şair [@Kullanıcı]\`
<@&${auth.Talent.YazTas}>: \`.yazılım [@Kullanıcı]\`
<@&${auth.Talent.VoiceActor}>: \`.voiceaktor [@Kullanıcı]\`
<@&${auth.Talent.GoLive}>: \`.golive [@Kullanıcı]\`
<@&${auth.Talent.Muzisyen}>: \`.müzisyen [@Kullanıcı]\`
`,}});
};
  
module.exports.help = {
  name: "ayardım",
  alias: ["abilityyardım","rolyardım","rolyardim","rol-yardım"]
};
