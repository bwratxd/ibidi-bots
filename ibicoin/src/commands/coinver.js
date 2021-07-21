const coin = require("../schemas/coin");
const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["cash"],
    name: "cash",
    help: "ascoin [yolla/ver] [kullanıcı] [sayı]"
  },

  run: async (client, message, args, embed, prefix) => {
		    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send(embed.setDescription("Bir kullanıcı belirtmelisin!"));

    if (args[0] === "yolla" || args[0] === "ver") {
      if (member.user.id === message.author.id) return message.channel.send(embed.setDescription("Kendine coin veremezsin!"));
      const count = parseInt(args[2]);
      if (!count) return message.channel.send(embed.setDescription("Coin vermek için bir sayı belirtmelisin!"));
      if (!count < 0) return message.channel.send(embed.setDescription("Verilecek sayı 0'dan küçük olamaz!"));
      let coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (!coinData || coinData && count > coinData.coin) return message.channel.send(embed.setDescription("Göndereceğin sayı kendi coininden yüksek olamaz!"));

      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: count } }, { upsert: true });
      await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { coin: -count } }, { upsert: true });
      coinData = await coin.findOne({ guildID: message.guild.id, userID: message.author.id });


      message.channel.send(embed.setDescription(`${member.toString()} kişisine başarıyla **${count}** coin gönderildi!`));
		}	
  }
	}
