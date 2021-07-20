module.exports.operate = async ({client, msg, args, member ,author, auth}, {MessageEmbed} = require("discord.js")) => {
    if ((!author.roles.cache.some(r => auth.YetkiliAlım.Yetkiler.includes(r.id))) && (!author.hasPermission("MANAGE_ROLES"))) return;
msg.channel.send({embed: { 
color: client.renk[Math.floor(Math.random() * client.renk.length)],
author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true}) }, 
description: `**Rol Yardım Menüsü**
Öncelikle bir rol vermek istiyorsanız <@&${auth.YetkiliAlım.YtAlimDm}> rolüne sahip olmanız gerekiyor. Bu komut sayesinde aşağıdaki rolleri kullanıcılara verebilirsiniz.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

\`.rise [@Kullanıcı]\` (<@&${auth.YetkiliAlım.BaslangicYetki}> - <@&${auth.YetkiliAlım.AltYetki}>)
\`.moon [@Kullanıcı]\` (<@&${auth.YetkiliAlım.BaslangicYetki2}> - <@&${auth.YetkiliAlım.AltYetki}>)
\`.shade [@Kullanıcı]\` (<@&${auth.YetkiliAlım.BaslangicYetki3}> - <@&${auth.YetkiliAlım.AltYetki}>)
\`.dreid [@Kullanıcı]\` (<@&${auth.YetkiliAlım.BaslangicYetki4}> - <@&${auth.YetkiliAlım.AltYetki}>)
\`.shadow [@Kullanıcı]\` (<@&${auth.YetkiliAlım.BaslangicYetki5}> - <@&${auth.YetkiliAlım.AltYetki}> - <@&${auth.YetkiliAlım.BotCommands}>)
`,}});
};
  
module.exports.help = {
  name: "ytverbilgi",
  alias: []
};
