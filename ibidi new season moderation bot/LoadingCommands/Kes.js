let KesSize = new Set();
module.exports.operate = async ({client, msg, args, member, auth, author}, ms = require("ms"), Database = require("../Models/Restriction.js"), Schema = require("../Models/Member.js")) => {
if ((!author.roles.cache.some(r => auth.Perms.VMuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    if (!KesSize[author.id])
        KesSize[author.id] = { kullanim: 0};
    if (KesSize[author.id].kullanim >= 4) return client.message(client.embed(`Bir gün içinde maximum 4 tane bağlantı kesebilirsin.`, msg), msg.channel.id, 6500);
if (!member) return client.message("etiketle ulan", msg.channel.id);
if (!member.voice.channel) return client.message("etiketlediğin ibibik sesli kanalda değil", msg.channel.id);
if (msg.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return client.message("bu etiketlediğin ibibik senden üstte.", msg.channel.id);
await client.message(" başarılı ", msg.channel.id);
member.voice.kick();
      KesSize[author.id].kullanim++;
    setTimeout(() => {
        if (KesSize[author.id].kullanim >= 1) {
            KesSize[author.id].kullanim = 0;
        }
    }, 86400000);
}

 
module.exports.help = {
  name: "kes",
  alias: ["bağlantıkes", "bağlantı-kes", "bkes"]
};
