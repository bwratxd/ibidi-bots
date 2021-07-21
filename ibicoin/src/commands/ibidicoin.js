const moment = require("moment");
require("moment-duration-format");
const {MessageEmbed} = require("discord.js");
const conf = require("../configs/config.json");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const coin = require("../schemas/coin");

module.exports = {
  conf: {
    aliases: ["coinim", "altınım", "coinim", "coinimm", "cash"],
    name: "ascoiin",
    help: "me",
		cooldown: 30000
  },

  run: async (client, message, args, embed) => {
    //if (message.channel.id !== "807692030703829012") return 
    let kanallar = ["848920653855457283"]
    if (!kanallar.includes(message.channel.id)) return 
    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika]");
    };
    
    const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
    const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
    const voiceLength = Active2 ? Active2.length : 0;
    let voiceTop;
    let messageTop;
    Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `\`❯\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
    Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `\`❯\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
    
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });

    const messageDaily = messageData ? messageData.dailyStat : 0;
    const messageWeekly = messageData ? messageData.weeklyStat : 0;

    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });

    const filteredParents = message.guild.channels.cache.filter((x) =>
      x.type === "category" &&
      !conf.publicParents.includes(x.id) &&
      !conf.registerParents.includes(x.id) &&
      !conf.solvingParents.includes(x.id) &&
      !conf.privateParents.includes(x.id) &&
      !conf.aloneParents.includes(x.id) &&
      !conf.funParents.includes(x.id)
    );

    const coinStatus = `<:altin:866953728333971476> **Altın Durumu:**\n- **Altın Miktarınız:** \`${coinData ? coinData.coin : 0}\`` 

		console.log(coinStatus)

    embed.setColor("YELLOW")
			embed.setThumbnail("https://media.discordapp.net/attachments/825522307342532638/830219305266053190/Untitled-1.png?width=471&height=471")
			    embed.setDescription(`${coinStatus}`)
   
    embed.setFooter(`RVT`)
    
    message.channel.send(`<:altin:866953728333971476> | ${message.author.tag}, senin şuan \`${coinData ? coinData.coin : 0}\` Altın'ın bulunuyor.`);
   
		console.log(embed)

  }
};
