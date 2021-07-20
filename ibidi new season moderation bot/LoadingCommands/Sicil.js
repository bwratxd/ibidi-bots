module.exports.operate = async ({client, msg, args, author, cfg, auth}, fetch = require("node-fetch"), Database = require("../Models/Restriction.js"), ms = require("ms")) => { 
    if ((!author.roles.cache.some(r => auth.Perms.MuteAuth.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
let member = (msg.mentions.users.first()) || await (await fetch(`https://discord.com/api/users/${args[0]}`, {method:'GET', headers: {'Authorization': 'Bot ' + client.token}})).json();
  Database.find({userID: member.id}, async (err, res) => {
    if (res.length <= 0) return client.message(client.embed(`${client.react("iptal")} | Kullanıcının ceza listesinde herhangi bir ceza bulunmuyor!`, msg), msg.channel.id, 5500);
    let listed = res.reverse();
    let currentPage = 1;
    const pageLimit = 5;
    let History = listed.map((x, index) => `\`${index + 1}.\` **[${x.Type}]** <@${x.Author}> (\`${x.Author}\`) tarafından **${x.Reason}** sebebiyle \`${client.toDate(x.DateNow)}\` tarihinde cezalandırıldı.(\`#${x.CezaID}\`)`);
    const pages = History.chunk(pageLimit);
    if (msg.content.includes("auto")) {
      let Sure = ms((msg.content.slice(msg.content.indexOf("auto") + 5)));
      if (!Sure || !ms(Sure)) return client.message(client.embed(`${client.react("iptal")} | Geçerli bir zaman dilimi girmelisin.`, msg), msg.channel.id, 5000);
      msg.channel.send({embed:{ 
      footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
      description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,
      thumbnail: { url: msg.guild.iconURL({dynamic:true})}, 
      author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true})}, 
      color: client.renk[Math.floor(Math.random()*client.renk.length)]}}).then(xd => {
        setInterval(() => {
          if (currentPage >= pages.length) return clearInterval(this);
          currentPage = currentPage + 1;
          xd.edit({embed:{
            footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
            description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,
            thumbnail: { url: msg.guild.iconURL({dynamic:true})}, 
            author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true})}, 
            color:client.renk[Math.floor(Math.random()*client.renk.length)]}});
        }, Sure);
      });
    } else {
      msg.channel.send({embed:{
        footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
        description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,
        thumbnail: { url: msg.guild.iconURL({dynamic:true})}, 
        author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true})}, 
        color:client.renk[Math.floor(Math.random()*client.renk.length)]}}).then(async xd => {
        if (listed.length > pageLimit) {
          await xd.react("◀");
          await xd.react("❌");
          await xd.react("▶");
          let collector = xd.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == author.id, { time: 200000 });
          collector.on("collect", async reaction => {
            if (reaction.emoji.name === "◀") {
              if (currentPage === 1) return;
              await reaction.users.remove(author.id).catch(err => { });
              currentPage--;
              xd.edit({embed:{
                footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
                description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,
                thumbnail: { url: msg.guild.iconURL({dynamic:true})}, 
                author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true})}, 
                color:client.renk[Math.floor(Math.random()*client.renk.length)]}});
            } else if (reaction.emoji.name === "▶") {
              if (currentPage === pages.length) return;
              await reaction.users.remove(author.id).catch(err => { });
              currentPage++;
              xd.edit({embed:{
                footer: { text: `Sayfa: ${currentPage}/${pages.length}`},
                description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,
                thumbnail: { url: msg.guild.iconURL({dynamic:true})}, 
                author: { name: msg.member.user.tag, icon_url:  msg.member.user.displayAvatarURL({dynamic:true})}, 
                color: client.renk[Math.floor(Math.random()*client.renk.length)]}});
            } else if (reaction.emoji.name === "❌") {
              xd.delete();
              collector.stop();
            };
          });
        };
      });
    };
  });
};
module.exports.help = {
  name: "sicil",
  alias: ["cezalar","cezasay","gbt"]
};