module.exports.operate = async ({msg}, moment = require("moment")) => {
    msg.channel.send({
    embed: {
   // title:`Sunucu Bilgileri`,
    description:`
\`•\` Sunucudaki **toplam** üye sayısı: **${msg.guild.memberCount}**
\`•\` Sunucuya son **1** saatte giren üye sayısı: **${msg.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
\`•\` Sunucuya bugün **giriş** yapan üye sayısı: **${msg.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
\`•\` Sunucuya bu **hafta** giriş yapan üye sayısı: **${msg.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
\`•\` Sunucuya bu **ay** giriş yapan üye sayısı: **${msg.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`,
}})
}
 module.exports.help = {
    name: "sbilgi",
    alias: ["sunucub","sunucubilgi","sb","sunucu"]
  };    
