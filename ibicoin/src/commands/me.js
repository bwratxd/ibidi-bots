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
    aliases: ["mark", "market", "marketler", "shop", "mağaza"],
    name: "market",
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

    const coinStatus = `<:altin:866953728333971476> 	**Altın  Durumu:**\n- **Altın  Miktarınız:** \`${coinData ? coinData.coin : 0}\`  \n───────────────` 

	//	console.log(coinStatus)

    embed.setColor("YELLOW")
		embed.setThumbnail("https://media.discordapp.net/attachments/825522307342532638/830219305266053190/Untitled-1.png?width=471&height=471")
    embed.setDescription(`Altta mağazamızda bulunan ürünler mevcuttur, eğer Altınınız aşağıdaki ürünleri almaya yetiyorsa bilet açmaktan kaçınma! \n<a:bos:866956128381042709>\n${coinStatus}`)
    embed.addField(`<:spotify:866953489523015680> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık Spotify üyeliği:    \n\`6500 Altın\`\n<:giftss:866956128356532255> 1 yıllık Spotify üyeliği: \n\`38550 Altın\``,true)
    embed.addField(`<:blutv:866953489057316876> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık BluTV üyeliği: \n\`6800 Altın\`\n <:giftss:866956128356532255> 1 yıllık BluTV üyeliği: \n\`39660 Altın\``,true)
    embed.addField(`<:exxen:866955370525622272> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık Exxen üyeliği: \n\`5500 Altın\`\n <:giftss:866956128356532255> 1 yıllık Exxen üyeliği: \n\`37900 Altın\``,true)
   embed.addField(`<:nitro:866953489194942525> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık Nitro Classic : \n\`45200 Altın\`\n <:giftss:866956128356532255>  1 aylık Nitro Booster: \n\`65000 Altın\``,true)		   
  embed.addField(`<:netflix:866953489381064755> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık Netflix üyeliği: \n\`7200 Altın\`\n <:giftss:866956128356532255> 1 yıllık Netflix üyeliği: \n\`43200 Altın\``,true)  
 embed.addField(`<:youtube:866955065020252230> Mağazası\n<a:bos:866956128381042709>`, `<:giftss:866956128356532255> 1 aylık Youtube üyeliği: \n\`8200 Altın\`\n <:giftss:866956128356532255> 1 yıllık Youtube üyeliği: \n\`45800 Altın\``,true)



    embed.setFooter(`RVT`)
    
    let mesaj = await message.channel.send(embed);
            const filter = (reaction, user) => {
            return ['<:spotify', 'blutv', 'exxen', 'nitro', 'metflix', 'youtube'].includes(reaction.emoji.name) && user.id === message.member.id;
        };
     await mesaj.react("866953489523015680")
     await mesaj.react("866953489057316876")
     await mesaj.react("866955370525622272")
		 await mesaj.react("866953489194942525")
		 await mesaj.react("866953489381064755")
		 await mesaj.react("866955065020252230")
             mesaj.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === 'spotify') {
              if(coinData.coin >= 6500) {
                message.guild.channels.create(`${message.member.displayName}-spotify`, {
    parent: "866960176010493962",
    type: "text",
    permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL'],

        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
  }).then(cloneChannel => {
 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
    let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    message.channel.send(emb.setDescription("<a:yildiz_ok:858639173883396096> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
    cloneChannel.send(emb.setDescription(`<:spotify:866953489523015680> Spotify biletiniz açıldı!`)).then(cloneChannel.send(`
		\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Spotify paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Spotify üyeliği: \`6500 Altın\`\n <:giftss:866956128356532255> 1 yıllık Spotify üyeliği: \`38550 Altın\``)
    
  )});
              } else {
                message.channel.send("<a:yildiz_no:858639174159433738> Spotify Bilet'i açmak için Altın'ınız yetersiz!")
              }
            } else if (reaction.emoji.name === 'blutv') { 
                if(coinData.coin >= 6800) { 
                    message.guild.channels.create(`${message.member.displayName}-blutv`, {
                        parent: "866960176010493962",
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("<:blutv:866953489057316876> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`<:blutv:866953489057316876> Blutv biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Blutv paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Blutv üyeliği: \`6800 Altın\`\n <:giftss:866956128356532255> 1 yıllık Blutv üyeliği: \`39660 Altın\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Blutv Bilet'i açmak için Altın'ınız yetersiz!")
                } 

            } else if (reaction.emoji.name === 'exxen') { 
                if(coinData.coin >= 5500) { 
                    message.guild.channels.create(`${message.member.displayName}-exxen`, {
                        parent: "866960176010493962",
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("\<:exxen:866955370525622272> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`\<:exxen:866955370525622272> Exxen biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Exxen paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Exxen üyeliği: \`5500 Altın\`\n <:giftss:866956128356532255> 1 yıllık Exxen üyeliği: \`37900 Altın\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Exxen Bilet'i açmak için Altın'ınız yetersiz!")
                } 
								       } else if (reaction.emoji.name === 'nitro') { 
                if(coinData.coin >= 7200) { 
                    message.guild.channels.create(`${message.member.displayName}-nitro`, {
                        parent: "866960176010493962",
											  type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("<:nitro:866953489194942525> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`<:nitro:866953489194942525> Nitro biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Nitro paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Nitro Classic: \`7200 Altın\`\n <:giftss:866956128356532255> 1 aylık Nitro Booster: \`43200 Altın\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Nitro Bilet'i açmak için Altın'ınız yetersiz!")
                } 
            } else if (reaction.emoji.name === 'netflix') { 
                if(coinData.coin >= 7200) { 
                    message.guild.channels.create(`${message.member.displayName}-netflix`, {
                        parent: "866960176010493962",
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("<:netflix:866953489381064755> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`<:netflix:866953489381064755> Netflix biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Netflix paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Netflix üyeliği: \`7200 Altın\`\n <:giftss:866956128356532255> 1 yıllık Netflix üyeliği: \`43200 Altın\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Netflix Bilet'i açmak için Altın'ınız yetersiz!")
                } 
                            } else if (reaction.emoji.name === 'youtube') { 
                if(coinData.coin >= 8200) { 
                    message.guild.channels.create(`${message.member.displayName}-youtube`, {
                        parent: "866960176010493962",
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("<:youtube:866955065020252230> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`<:youtube:866955065020252230>> Youtube biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Youtube paketinizi seçiniz:\n\n <:giftss:866956128356532255> 1 aylık Youtube üyeliği: \`8200 Altın\`\n <:giftss:866956128356532255> 1 yıllık Youtube üyeliği: \`45800 Altın\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Youtube Bilet'i açmak için Altın'ınız yetersiz!")
                } 
             } else if (reaction.emoji.name === 'steam') { 
                if(coinData.coin >= 40200) { 
                    message.guild.channels.create(`${message.member.displayName}-steam`, {
                        parent: "866960176010493962",
                        type: "text",
                        permissionOverwrites: [
                            {
                              id: message.guild.id,
                              deny: ['VIEW_CHANNEL'],
                    
                            },
                            {
                              id: message.author.id,
                              allow: ['VIEW_CHANNEL'],
                            },
                          ],
                      }).then(cloneChannel => {
												 		setTimeout(()=>{
   cloneChannel.delete();
  },1800000)
                            let emb = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
                        message.channel.send(emb.setDescription("<:rvt_steam:817224200506048532> Biletin başarıyla oluşturuldu, `"+cloneChannel.name+"`.")).then(message.react('858639173883396096'))
                        cloneChannel.send(emb.setDescription(`<:rvt_steam:817224200506048532> Steam biletiniz açıldı!`)).then(cloneChannel.send(`\`❯\` ${message.author} Hey dostum merhaba! lütfen alacağınız Steam paketinizi seçiniz:\n\n <:giftss:866956128356532255> 50 TRY'lik oyun: \`40200 Altın\`\n <:giftss:866956128356532255> 75 TRY'lik oyun: \`47650 Altın\`\n <:giftss:866956128356532255> 100 TRY'lik oyun: \`55200 Altın\`\n <:giftss:866956128356532255> 150 TRY'lik oyun: \`69200 Altın\`\n <:giftss:866956128356532255> 200 TRY'lik oyun: \`82200 Altın\`\n <:giftss:866956128356532255> 250 TRY'lik oyun: \`94200 AscoAltınin\``))

                      })
                } else { 
                    message.channel.send("<a:yildiz_no:858639174159433738> Steam Bilet'i açmak için Altın'iniz yetersiz!")
                } 
             }
        })
//		console.log(embed)

  }
};
