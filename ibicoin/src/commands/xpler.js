const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../schemas/messageGuild");
const messageGuildChannel = require("../schemas/messageGuildChannel");
const voiceGuild = require("../schemas/voiceGuild");
const voiceGuildChannel = require("../schemas/voiceGuildChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const coin = require("../schemas/coin");

module.exports = {
  conf: {
    aliases: [],
    name: "altınlar",
    help: "altınlarr"
  },
  
  run: async (client, message, args, embed) => {
    let arr = ["852913082321862706"]
    if(!arr.includes(message.author.id)) return message.channel.send("<:ibi_carpi:828716070612893747> Sadece bot sahipleri kullanabilir!").then(message.react('767841882864222229')).then(x => x.delete({timeout: 5000}))
    const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });

    let coinSum = 0;

 
    const coinUsers = coinData.splice(0, 30).map((x, index) => {
      coinSum += x.coin;
      return `\`${index+1}.\` <@${x.userID}>: \`${Number(x.coin).toLocaleString()} Altınlar\``
    }).join(`\n`);

    embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
    embed.setFooter(`RVT`)
	embed.setThumbnail("https://media.discordapp.net/attachments/825522307342532638/830219305266053190/Untitled-1.png?width=471&height=471")
	    message.channel.send(embed.setDescription(`
      <:altin:830815264316194847> | RVT Sunucusunun en zenginleri bu listede koş ahali!! | <:altin:830815264316194847>

    **➥ Altın Bilgileri: \`(Toplam ${coinSum})\`**
    ${coinUsers.length > 0 ? coinUsers : "Veri Bulunmuyor."}
    `))
  }
};	