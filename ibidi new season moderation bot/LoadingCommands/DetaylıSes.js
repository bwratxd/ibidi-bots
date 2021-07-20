module.exports.operate = async ({client, msg, args, author, auth}, {MessageEmbed} = require("discord.js")) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    const xd = args[0];
     const TaglıSize = msg.guild.members.cache.filter(u => u.user.username.includes(auth.Tags.RealTag)).size || 0;
     const VoiceSize = msg.guild.channels.cache.filter(c => c.type === "voice").map(c=> c.members.size).reduce((a,b) => a+b) || 0;
     const parent = (name) => {
      const parentID = auth.Voice[name];
      return msg.guild.channels.cache.filter(x => x.type == "voice" && x.parentID == parentID);
   };
  if (!xd || (xd && !["detay", "detaylı"].includes(xd))) {
   client.message(client.embed(`${auth.Reacts.star} Sunucumuzda seste toplam **${VoiceSize}** kullanıcı bulunmaktadır.\n\n${auth.Reacts.star} Sunumuzda tag almış **${TaglıSize}** kullanıcı bulunmaktadır.`, msg, true), msg.channel.id)
  } else if (["detay", "detaylı"].includes(xd)) {
   const parents = { register: { channels: parent("register") }, public: { channels: parent("public") }, secret: { channels: parent("secret") }, alone: { channels: parent("alone") }, other: { channels: parent("other") } };
   const FakeVoice = msg.guild.channels.cache.filter(c => c.type === "voice").map(c => c.members && c.members.filter(x => x.user.createdAt <= client.getDate(1, "hafta")).size).reduce((a,b) => a+b) || 0;
   const BotVoice = msg.guild.channels.cache.filter(c => c.type === "voice").map(c => c.members && c.members.filter(x => x.user.bot).size).reduce((a,b) => a+b) || 0;
   const nev = {};
    Object.keys(parents).forEach(value => {
     const xd = parents[value];
      if (xd && (xd.channels && xd.channels.size > 0)) {
       const parentTotal = xd.channels.map(x => x.members.size).reduce((x, y) => x + y) || 0;
       const parentFake = xd.channels.map(x => x.members && x.members.filter(v => v.user.createdAt <= client.getDate(1, "hafta")).size).reduce((x, y) => x + y) || 0;
       const parentBot = xd.channels.map(x => x.members && x.members.filter(v => v.user.bot).size).reduce((x, y) => x + y) || 0;
      xd.total = parentTotal;
      xd.fake = parentFake;
      xd.bot = parentBot;
    return nev[value] = xd;
  }; 
});
   const embed = new MessageEmbed()
    .setAuthor(msg.author.username, msg.author.avatarURL({ dynamic: true }))
    .setFooter(`Sayısal istatistikler (Toplam | Fake | Bot) şeklinde sıralanmıştır.`)
    .setDescription(`${auth.Reacts.star} Sunucumuzda seste (\`${VoiceSize}\` | \`${FakeVoice}\` | \`${BotVoice}\`) kullanıcı bulunmaktadır.\n────────────\n${Object.keys(nev).map((value, index) => `${auth.Reacts.star} **${value.charAt(0).toUpperCase() + value.slice(1)}** Kategorisinde (\`${nev[value].total}\` | \`${nev[value].fake}\` | \`${nev[value].bot}\`) kullanıcı bulunmaktadır.`).join("\n")}`);
     client.message(embed, msg.channel.id);
    };
  };

  
  module.exports.help = {
    name: "ses",
    alias: []
  };