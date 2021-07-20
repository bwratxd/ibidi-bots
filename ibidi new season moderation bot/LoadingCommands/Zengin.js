let Sayi = new Set()
module.exports.operate = async ({client, msg, args, author, auth}, {MessageEmbed} = require("discord.js")) => {
    if (!author.roles.cache.get(auth.Booster)) return client.message(client.embed(`Bu komutu kullanabilmek için sunucuya boost basmış olman gerekli.`,msg), msg.channel.id, 6500);
    if (!Sayi[author.id])
        Sayi[author.id] = { kullanim: 0 };
    if (Sayi[author.id].kullanim >= 5) return client.message(client.embed(`${client.react("iptal")} | Bir gün içinde maximum 5 kere ismin değiştirebilirsin.`, msg), msg.channel.id, 6500);
    if (!args.join(" ")) return client.message(client.embed(`Herhangi bir isim girmelisin.`, msg), msg.channel.id, 6500);
    if (args.join(" ").lenght > 20) return client.message(client.embed(`${client.react("iptal")} | Kullanmak istediğin kullanıcı adı 20 karakterden uzun olamaz.`, msg), msg.channel.id, 6500);
    await msg.member.setNickname(`${msg.member.user.username.includes(auth.Tags.RealTag) ? auth.Tags.RealTag : auth.Tags.FakeTag} ${args.join(" ")}`).catch(() => { });
    msg.react(client.react("duztik")).catch(() => { })
    Sayi[author.id].kullanim++;
    setTimeout(() => {
        if (Sayi[author.id].kullanim >= 1) {
            Sayi[author.id].kullanim = 0;
        }
    }, 86400000)
  };
  
  module.exports.help = {
    name: "booster",
    alias: ["zengin"]
  };
