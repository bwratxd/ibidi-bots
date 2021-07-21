const coin = require("../schemas/coin");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["coin"],
    name: "uncoin",
    help: "coin [ekle/sil] [kullanıcı] [sayı]"
  },

  run: async (client, message, args, embed, prefix) => {
    let arr = ["852913082321862706"]
    if(!arr.includes(message.author.id)) return message.channel.send("<a:yildiz_no:858639174159433738> Sadece bot sahipleri kullanabilir!").then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send(embed.setDescription("Lütfen bir üyeyi etiketle ve tekrar dene!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))

    if (args[0] === "ekle" || args[0] === "add") {
      
      //if (member.user.id === message.author.id) return message.channel.send(embed.setDescription("Kendine puan ekleyemezsin!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
      const count = parseInt(args[2]);
     
      if (!count) return message.channel.send(embed.setDescription("Ekleyeceğin puanı belirtmelisin!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
      if (!count < 0) return message.channel.send(embed.setDescription("Eklenecek sayı 0'dan küçük olamaz!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: count } }, { upsert: true });
      const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });

      message.channel.send(embed.setDescription(`Başarıyla ${member.toString()} kullanıcısına **${count}** adet altın eklendi!`)).then(message.react('858639173883396096')).then(x => x.delete({timeout: 5000}))
    } else if (args[0] === "sil" || args[0] === "remove") {
      //if (member.user.id === message.author.id) return message.channel.send(embed.setDescription("Kendi puanını düşüremezsin!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
      const count = parseInt(args[2]);
      if (!count) return message.channel.send(embed.setDescription("Çıkarılacak için bir sayı belirtmelisin!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))
      if (!count < 0) return message.channel.send(embed.setDescription("Çıkarılacak sayı 0'dan küçük olamaz!")).then(message.react('858639174159433738')).then(x => x.delete({timeout: 5000}))

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -count } }, { upsert: true });
      const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
      
      message.channel.send(embed.setDescription(`Başarıyla ${member.toString()} kullanıcısından **${count}** adet altın alındı!`)).then(message.react('858639173883396096')).then(x => x.delete({timeout: 5000}))
    }
  }
};
