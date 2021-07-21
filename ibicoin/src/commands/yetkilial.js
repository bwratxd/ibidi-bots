const coin = require("../schemas/coin");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["yetkili"],
    name: "yedkili",
    help: "coin [ekle/sil] [kullanıcı] [sayı]"
  },

  run: async (client, message, args, embed, prefix) => {
    if(!message.member.roles.cache.has("848920653661863942")) return
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send(embed.setDescription("Lütfen bir üyeyi etiketle ve tekrar dene!")).then(message.react('767841882864222229')).then(x => x.delete({timeout: 5000}))

    if (args[0] === "yap" || args[0] === "al") {     

        await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { coin: 30 } }, { upsert: true });
        await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: 400 } }, { upsert: true });

        member.roles.add("848920653633028170")
member.roles.add("848920653624508448")
      message.channel.send(embed.setDescription(`Başarıyla ${member.toString()} kullanıcısına başlangıç rolleri verildi!`)).then(message.react('743814125380960298')).then(x => x.delete({timeout: 5000}))
    
    }
  }
};
