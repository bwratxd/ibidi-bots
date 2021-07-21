const moment = require("moment");
require("moment-duration-format");
const conf = require("../configs/config.json");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const coin = require("../schemas/coin");

module.exports = {
  conf: {
    aliases: ["kullanıcı", "u"],
    name: "user",
    help: "user [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    
    //if (message.channel.id !== "807692030703829012") return 
    let arr = ["852913082321862706"]
    if(!arr.includes(message.author.id)) return message.channel.send("<:ibi_carpi:828716070612893747> Sadece bot sahipleri kullanabilir!").then(message.react('767841882864222229')).then(x => x.delete({timeout: 5000}))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send(embed.setDescription("Lütfen bir üyeyi etiketle ve tekrar dene!")).then(message.react('767841882864222229')).then(x => x.delete({timeout: 5000}))

    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika]");
    };
    
    const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
    const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
    const voiceLength = Active2 ? Active2.length : 0;
    let voiceTop;
    let messageTop;
    Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
    Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
    
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });

    const messageDaily = messageData ? messageData.dailyStat : 0;
    const messageWeekly = messageData ? messageData.weeklyStat : 0;

    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });

    const filteredParents = message.guild.channels.cache.filter((x) =>
      x.type === "category" &&
      !conf.publicParents.includes(x.id) &&
      !conf.registerParents.includes(x.id) &&
      !conf.solvingParents.includes(x.id) &&
      !conf.privateParents.includes(x.id) &&
      !conf.aloneParents.includes(x.id) &&
      !conf.funParents.includes(x.id)
    );



    const coinStatus = `**<a:ibi_star:828716136614592603> Altın Durumu:**\n- Altın'ları: \`${coinData ? coinData.coin : 0}\`  \n───────────────`

	embed.setThumbnail("https://media.discordapp.net/attachments/825522307342532638/830219305266053190/Untitled-1.png?width=471&height=471")
    embed.setDescription(`
    ${member.user.toString()} (${member.roles.highest}) kişisinin altın verileri
    **───────────────**
    ${coinStatus}
    `)
    embed.setFooter(`RVT`)
    message.channel.send(embed);
  }
};

function progressBar(value, maxValue, size) {
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  
  const progressText = "<a:rvt_yortabar:830170964800831538>".repeat(progress);
  const emptyProgressText = "<:rvt_ortabar:830171041409663086>".repeat(emptyProgress);
  
  return emptyProgress > 0 ? `<a:rvt_ygirisbar:830170998564978768>${progressText}${emptyProgressText}<:rvt_bitisbar:830170916854956142>` : `<a:rvt_ygirisbar:830170998564978768>${progressText}${emptyProgressText}<a:rvt_ybitisbar:830170936808177685>`;
  };