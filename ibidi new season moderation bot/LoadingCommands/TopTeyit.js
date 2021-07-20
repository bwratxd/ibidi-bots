module.exports.operate = async ({client, msg, args, author, auth}, Database = require("../Models/Member.js")) => {
  if ((!author.roles.cache.some(r => auth.Perms.RegisterAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
  Database.find({SunucuID: msg.guild.id}, async (err, res) => {
    let listed = res.filter(x => ((x.Authorized.Woman + x.Authorized.Man) !== 0) && (msg.guild.members.cache.get(x.userID)) && ((msg.guild.members.cache.get(x.userID).permissions.has("ADMINISTRATOR")) || (msg.guild.members.cache.get(x.userID).roles.cache.some(x => auth.Perms.RegisterAuth.includes(x.id))))).sort((x, y) => (y.Authorized.Man + y.Authorized.Woman) - (x.Authorized.Man + x.Authorized.Woman));
    if (!listed.length) return client.message(client.embed(`Sunucuda her hangi bir kayıt bulunamamaktadır.`, msg), msg.channel.id, 5000);
    let currentPage = 1;
    let pageLimit = 20;
    let pages = listed.chunk(pageLimit);
    msg.channel.send({embed:{
      footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
      description: `Sunucumuzun en fazla kayıt yapanları aşağıda listelenmiştir!\n${pages[currentPage - 1].map((kisi, index) => `\`${index + 1}.\` ${msg.guild.members.cache.get(kisi.userID).toString()} **Toplam: ${Number(kisi.Authorized.Man) + Number(kisi.Authorized.Woman)}** kayıta sahip`).join("\n")}`, thumbnail: {url: msg.author.avatarURL({dynamic:true})}, author: {name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}, color:client.renk[Math.floor(Math.random()*client.renk.length)]}}).then(async x => {
      if (listed.length > pageLimit) {
      await x.react("◀");
      await x.react("❌");
      await x.react("▶");
      let collector = x.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == author.id, { time: 200000 });
      collector.on("collect", async reaction => {
        if (reaction.emoji.name === "◀") {
          await reaction.users.remove(author.id).catch(err => { });
          if (currentPage === 1) return;
          currentPage--;
          if (x) x.edit({embed:{
            footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
            description: `Sunucumuzun en fazla kayıt yapanları aşağıda listelenmiştir!\n${pages[currentPage - 1].map((kisi, index) => `\`${index + 1}.\` ${msg.guild.members.cache.get(kisi.userID).toString()} **Toplam: ${Number(kisi.Authorized.Man) + Number(kisi.Authorized.Woman)}** kayıta sahip`).join("\n")}`, thumbnail: {url: msg.author.avatarURL({dynamic:true})}, author: {name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}, color:client.renk[Math.floor(Math.random()*client.renk.length)]}});
        } else if (reaction.emoji.name === "▶") {
          await reaction.users.remove(author.id).catch(err => { });
          if (currentPage == pages.length) return;
          currentPage++;
          if (x) x.edit({embed:{
            footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
            description: `Sunucumuzun en fazla kayıt yapanları aşağıda listelenmiştir!\n${pages[currentPage - 1].map((kisi, index) => `\`${index + 1}.\` ${msg.guild.members.cache.get(kisi.userID).toString()} **Toplam: ${Number(kisi.Authorized.Man) + Number(kisi.Authorized.Woman)}** kayıta sahip`).join("\n")}`, thumbnail: {url: msg.author.avatarURL({dynamic:true})}, author: {name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}, color:client.renk[Math.floor(Math.random()*client.renk.length)]}});
        } else if (reaction.emoji.name === "❌") {
           x.delete();
           collector.stop();
          };
        });
      };
    });
  });
};

module.exports.help = {
  name: "tt",
  alias: ["topteyit","top-teyit", "t-t"]
};