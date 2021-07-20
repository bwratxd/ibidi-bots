module.exports.operate = async ({client, msg, args, author, auth}) => {
    if ((!author.roles.cache.some(r => auth.Perms.Yonetim.includes(r.id))) && (!author.permissions.has("ADMINISTRATOR"))) return;
    let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0]);
    if (!rol) return msg.channel.send({ embed: { author: { name: msg.guild.name, icon_url: msg.guild.iconURL({ dynamic: true }) }, description: `**Bir rol belirtmelisin.** \`@Rol yada ID\``, color: client.renk[Math.floor(Math.random() * client.renk.length)] } });
    if (!args[1]) {
      let listed = Array.from(rol.members.array().map((val, ind) => `\`${ind + 1}.\` ${val} - (\`${val.id}\` **/** \`${val.displayName}\`)`).values());
      client.chunkArray(listed, 20).forEach(r => {
        msg.channel.send({
          embed: {
            author: { name: msg.guild.name, icon_url: msg.guild.iconURL({ dynamic: true }) },
            description: `${rol} **rolündeki üyeler:**\n ${r.join(",\n")}`,
            color: client.renk[Math.floor(Math.random() * client.renk.length)]
          }
        }).catch(() => { });
      });
    } else if (["ses"].includes(args[1])) {
        let listed = Array.from(rol.members.array().map((val, ind) => `\`${ind + 1}.\` ${val} - (\`${val.id}\` **/** \`${val.displayName}\` / \`${val.voice.channel ? val.voice.channel.name : "Seste Yok!"} \`)`).values());
        client.chunkArray(listed, 20).forEach(r => {
          msg.channel.send({
            embed: {
              author: { name: msg.guild.name, icon_url: msg.guild.iconURL({ dynamic: true }) },
              description: `${rol} **rolündeki üyeler:**\n ${r.join(",\n")}`,
              color: client.renk[Math.floor(Math.random() * client.renk.length)]
            }
          }).catch(() => { });
        });
    } else { };
  };
  
  module.exports.help = {
    name: "listele",
    alias: ["sırala","üyeler","uyeler","rolkullanıcıları"]
  };