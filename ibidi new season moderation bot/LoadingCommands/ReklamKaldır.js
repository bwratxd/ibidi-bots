module.exports.operate = async ({client, msg, args,auth, author, member}, fetch = require('node-fetch'), Database = require("../Models/Restriction.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.JailAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  if (!member) return client.message(client.noMember(msg), msg.channel.id, 6500);
  if (member.user.username.includes(auth.Tags.RealTag)) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının isminde tagımız bulunuyor bu yüzden işlem iptal edildi.`, msg),msg.channel.id,6500);
  await member.roles.set(auth.Perms.Unregister).catch(() => { });
  await member.setNickname(null).catch(()=> { });
  if (member.voice.channel) return member.voice.kick().catch(()=> { });
  msg.react(client.react("duztik")).catch(() => { });
};

  module.exports.help = {
    name: "unreklam",
    alias: []
  };


 