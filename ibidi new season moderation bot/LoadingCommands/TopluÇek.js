module.exports.operate = ({client, msg, args, author, uye, auth}) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  if (!args[0]) return msg.channel.send({embed: {description:"**Bir kanal idsi girmelisin.**"}}).then(msj => msj.delete({ timeout: 5000 }));
  if (!args[1]) {
    let kanal = author.voice.channelID;
    let kanal2 = args[0];
    var uyeler = msg.guild.members.cache.filter(u => msg.guild.member(u).voice.channelID === kanal2);
    if (uyeler.size < 1) return msg.channel.send({embed: {description:"**Taşımak istediğin kanalda hiç kimse bulunmamaktadır.**"}}).then(msj => msj.delete({ timeout: 5000 }));
    if (kanal === kanal2) return msg.channel.send({embed: {description:"**İki kanalda aynı. Farklı kanalları denemelisin.**"}}).then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(u => u.voice.setChannel(kanal));
     msg.channel.send({embed: {
      author: { name: msg.guild.name, icon_url: msg.guild.iconURL({ dynamic: true}) },
      color: client.renk[Math.floor(Math.random() * client.renk.length)],
      description:`\`${uyeler.size}\` adet üye \`${msg.guild.channels.cache.get(kanal).name}\` adlı kanaldan \`${msg.guild.channels.cache.get(kanal2).name}\` adlı kanala taşınmaktadır. Bu işlem biraz sürebilir.`}})
  } else {
    let kanal = args[1];
    let kanal2 = args[0];
    var uyeler = msg.guild.members.cache.filter(u => msg.guild.member(u).voice.channelID === kanal2);
    if (uyeler.size < 1) return msg.channel.send({embed: {description:"**Taşımak istediğin kanalda hiç kimse bulunmamaktadır.**"}}).then(msj => msj.delete({ timeout: 5000 }));
    if (kanal === kanal2) return msg.channel.send({embed: {description:"**İki kanalda aynı. Farklı kanalları denemelisin.**"}}).then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(u => u.voice.setChannel(kanal));
    msg.channel.send({embed: {
      author: { name: msg.guild.name, icon_url: msg.guild.iconURL({ dynamic: true}) },
      color: client.renk[Math.floor(Math.random() * client.renk.length)],
      description:`\`${uyeler.size}\` adet üye \`${msg.guild.channels.cache.get(kanal).name}\` adlı kanaldan \`${msg.guild.channels.cache.get(kanal2).name}\` adlı kanala taşınmaktadır. Bu işlem biraz sürebilir.`}})
  };
};

module.exports.help = {
  name: "topluçek",
  alias: ["toplutaşı","toplutasi"]
};