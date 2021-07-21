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
    name: "topcoin",
    help: "topcoin"
  },
  
  run: async (client, message, args, embed) => {
		  let arr = ["852913082321862706"]
    if(!arr.includes(message.author.id)) return message.channel.send("<:ibi_carpi:828716070612893747> Sadece bot sahipleri kullanabilir!").then(message.react('767841882864222229')).then(x => x.delete({timeout: 5000}))
    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const coinData = await coin.find({ guildID: message.guild.id }).sort({ coin: -1 });

    let coinSum = 0;

    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join(`\n`);
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join(`\n`);
    const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);
    const coinUsers = coinData.splice(0, 20).map((x, index) => {
      coinSum += x.coin;
      return `\`${index+1}.\` <@${x.userID}>: \`${Number(x.coin).toLocaleString()} Puan\``
    }).join(`\n`);

    embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
    embed.setFooter(`RVT`)
	embed.setThumbnail("https://media.discordapp.net/attachments/825522307342532638/830219305266053190/Untitled-1.png?width=471&height=471")
	    message.channel.send(embed.setDescription(`
    **${message.guild.name}** sunucusunun toplam verileri
    **─────────────**
    \`❯\` **Puan Bilgileri**: \`(Toplam ${coinSum})\`
    ${coinUsers.length > 0 ? coinUsers : "Veri Bulunmuyor."}
    `))
  }
};